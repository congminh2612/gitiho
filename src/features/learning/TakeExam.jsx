import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PiStudent } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import Select from '../../components/Select/Select'
import { GetTopicByGrade } from '../learning-self/services/getTopicByGrade'
import { Modal } from 'antd'
import { AddTestDetail } from './services/exam'
import { ExclamationCircleFilled } from '@ant-design/icons';

const TakeExam = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector((state) => state.auth.currentUser.account)
    const { control } = useForm()
    const { subjectId, subjectName } = location.state
    const [grade, setGrade] = useState(null)
    const [topicType, setTopicType] = useState(null)
    const optionExam = [
        { value: '2', label: 'Kiểm tra 15 phút' },
        { value: '3', label: 'Kiểm tra 1 tiết' },
        { value: '4', label: 'Kiểm tra học kì' },
        { value: '5', label: 'THPT Quốc Gia' }
    ]
    const optionGrade = [
        { value: '10', label: 'Khối 10' },
        { value: '11', label: 'Khối 11' },
        { value: '12', label: 'Khối 12' }
    ]
    const {
        data: topicStudy,
        refetch,
        isLoading
    } = useQuery({
        queryKey: ['topicStudy', grade, subjectId, user.accountId],
        queryFn: () => GetTopicByGrade(grade, subjectId, topicType, user.accountId),
        enabled: !!grade && !!topicType
    })
    const handleClick = async (item) => {
        const result = await AddTestDetail(user.accountId);
        const testDetailId = result.testdetail.testDetailId;
        if (result) {
            navigate('/examStage', {
                state: {
                    testDetailId: testDetailId,
                    topicId: item.topicId,
                    duration: item.duration,
                    topicName: item.topicName,
                },
            });
        }
    };
    const { confirm } = Modal;
    const showConfirm = (item) => {
        confirm({
            title: 'Vui lòng kiểm tra thật kĩ trước khi bắt đầu làm bài',
            width: 600,
            icon: <ExclamationCircleFilled />,
            content: 'Chúc bạn có được kết quả tốt',
            onOk() {
                handleClick(item)
            },
            okText: 'Bắt đầu',
            cancelText: 'Hủy',
        });
    };
    return (
        <div className="container mx-auto px-[100px]">
            <div className="flex items-center mt-[80px]">
                <div>
                    <PiStudent size="28" className="text-gray-text" />
                </div>
                <p className="text-gray-text text-2xl font-semibold ml-1">
                    Luyện tập trắc nghiệm
                </p>
                <div className="ml-6 rounded-xl bg-subject px-6 py-2 text-white">
                    {subjectName ?? ''}
                </div>
            </div>
            <div className="w-[400px]">
                <Select
                    name="grade"
                    control={control}
                    options={optionExam}
                    label="Chọn bài kiểm tra"
                    onChange={(e) => {
                        setTopicType(e.target.value)
                        refetch()
                    }}
                />
            </div>
            <div className="w-[400px]">
                <Select
                    name="grade"
                    control={control}
                    options={optionGrade}
                    label="Chọn Khối"
                    onChange={(e) => {
                        setGrade(e.target.value)
                        refetch()
                    }}
                />
            </div>
            <div className="pt-6 text-lg font-medium">
                {topicStudy && JSON.stringify(topicStudy.data) === '[]' && (
                    <div>Rất tiếc chúng tôi chưa có bài kiểm tra cho phần này</div>
                )}
                {topicStudy && JSON.stringify(topicStudy.data) !== '[]' && (
                    <div className="space-y-4">
                        {topicStudy.data.map((topic) => {
                            return (
                                <div
                                    key={topic.topicId}
                                    className="bg-subject text-white py-2 px-4 rounded-xl w-[450px] hover:opacity-75 cursor-pointer"
                                    onClick={() => showConfirm(topic)}
                                >
                                    <p>{topic.topicName}</p>
                                    <div>
                                        <p>Thời gian làm bài  {topic.duration} phút</p>
                                        <p>Số lượng câu hỏi {topic.totalQuestion}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TakeExam
