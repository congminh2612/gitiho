import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PiStudent } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Select from '../../../components/Select/Select'
import { useQuery } from '@tanstack/react-query'
import { GetTopicByGrade } from '../services/getTopicByGrade'

const TopicStudy = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useSelector((state) => state.auth.currentUser.account)
  const { control } = useForm()
  const { subjectId, subjectName } = location.state
  const [grade, setGrade] = useState(null)
  const options = [
    { value: '10', label: 'Khối 10' },
    { value: '11', label: 'Khối 11' },
    { value: '12', label: 'Khối 12' }
  ]
  const {
    data: topicStudy,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['topicStudy', grade, subjectId, currentUser.accountId],
    queryFn: () => GetTopicByGrade(grade, subjectId, 1, currentUser.accountId),
    enabled: !!grade
  })
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
          options={options}
          label="Chọn Khối"
          onChange={(e) => {
            setGrade(e.target.value)
            refetch()
          }}
        />
      </div>
      <div className="pt-6 text-lg font-medium">
        {topicStudy && JSON.stringify(topicStudy.data) === '[]' && (
          <div>Rất tiếc chúng tôi chưa có bài tập cho phần này</div>
        )}
        {topicStudy && JSON.stringify(topicStudy.data) !== '[]' && (
          <div className="space-y-4">
            {topicStudy.data.map((topic) => {
              return (
                <div
                  key={topic.topicId}
                  className="bg-subject text-white py-2 px-4 rounded-xl w-[450px] hover:opacity-75 cursor-pointer"
                  onClick={() => navigate(`/study/${topic.topicId}`)}
                >
                  <p>{topic.topicName}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default TopicStudy
