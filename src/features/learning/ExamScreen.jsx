import React from 'react'
import { LuBookOpen } from 'react-icons/lu'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getSubject } from '../learning-self/services/getSubject'


const ExamScreen = () => {
    const navigate = useNavigate()
    const { data: subjects } = useQuery({
        queryKey: ['subject'],
        queryFn: getSubject
    })
    const handleClick = (subjectId, subjectName) => {
        navigate('/takeExam', {
            state: {
                subjectId: subjectId,
                subjectName: subjectName
            }
        })
    }
    return (
        <div className="container mx-auto px-[100px] mt-[80px]">
            <div className="flex items-center space-x-4">
                <div>
                    <LuBookOpen className="text-gray-text" size="28" />
                </div>
                <div className="text-2xl font-semibold text-gray-text">
                    Đề kiểm tra
                </div>
            </div>
            <div>
                {subjects ? (
                    <div className="grid grid-cols-3 gap-8 mt-12 cursor-pointer ">
                        {subjects.data.map((subject) => {
                            return (
                                <div
                                    key={subject.subjectId}
                                    className="bg-subject bg-opacity-15 rounded-[30px] flex py-5 px-3 items-center hover:opacity-80"
                                    onClick={() =>
                                        handleClick(subject.subjectId, subject.subjectName)
                                    }
                                >
                                    <p className="text-white flex-1 text-xl ml-4">
                                        {subject?.subjectName}
                                    </p>
                                    <img src={subject?.imgLink} alt="" width="50px" />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div>Không tìm thấy môn học nào</div>
                )}
            </div>
        </div>
    )
}

export default ExamScreen
