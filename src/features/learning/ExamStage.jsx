import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetQuestionByTopic } from '../learning-self/services/getQuestionByTopic'
import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { AddQuestionTest, UpdateTestDetailService } from './services/exam'

const ExamStage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  let topicId = location.state.topicId
  let topicName = location.state.topicName
  let testDetailId = location.state.testDetailId
  let duration = location.state.duration
  const [questions, setQuestions] = useState([])
  const [questionDone, setQuestionDone] = useState([])

  const handleGetData = async () => {
    try {
      const result = await GetQuestionByTopic(topicId)
      if (result.status === 200) {
        setQuestions(result.data)
        setQuestionDone(
          result.data.map((item) => ({
            questionId: item.questionId,
            answerId: '',
            isChoose: false
          }))
        )
      }
    } catch (error) {
      console.error('Error fetching mod service:', error)
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  const handleQuestion = (e) => {
    const optionId = e.target.value
    const questionId = e.target.name
    console.log(optionId)
    console.log(questionId)
    setQuestionDone(
      questionDone.map((item, index) => {
        if (optionId !== '' && questionId == item.questionId) {
          return {
            ...item,
            answerId: optionId,
            isChoose: true
          }
        } else {
          return {
            ...item
          }
        }
      })
    )
  }

  const handleClickScroll = (questionId) => {
    const element = document.getElementById(questionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleSubmit = async () => {
    questionDone.map((item) =>
      item.answerId != null
        ? AddQuestionTest(item.questionId, testDetailId, item.answerId)
        : AddQuestionTest(item.questionId, testDetailId, '')
    )
    await UpdateTestDetailService(testDetailId)
    navigate('/examResult', {
      state: {
        testDetailId: testDetailId
      }
    })
  }

  const { confirm } = Modal
  const showConfirm = () => {
    confirm({
      title: 'Vui lòng kiểm tra thật kĩ trước khi nộp bài',
      width: 600,
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleSubmit()
      },
      okText: 'Nộp bài',
      cancelText: 'Hủy'
    })
  }

  const initialMinute = duration - 1
  const initialSeconds = 59
  const [minutes, setMinutes] = useState(initialMinute)
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
      if (minutes === 0 && seconds === 0) {
        handleSubmit()
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [minutes, seconds])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img src={''} alt="Timer" />
          <h4 className="ml-2 text-xl font-bold">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h4>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/4 p-4 border-r border-gray-300">
          <div className="mb-4">
            <h6 className="text-lg font-semibold">{topicName}</h6>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Câu hỏi</p>
            <div className="grid grid-cols-5 gap-2">
              {questionDone.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 text-center cursor-pointer ${item.isChoose ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleClickScroll(item.questionId)}
                >
                  <p>{index + 1}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              className="w-full py-2 bg-blue-500 text-white font-bold rounded"
              onClick={showConfirm}
            >
              Nộp bài
            </button>
          </div>
        </div>
        <div className="w-3/4 p-4">
          {questions.map((item, index) => (
            <div key={index} className="mb-6" id={item.questionId}>
              <div className="mb-2 flex items-center">
                <p className="font-bold">Câu {index + 1}:</p> &nbsp;
                <div
                  dangerouslySetInnerHTML={{ __html: item.questionContext }}
                ></div>
                {item.image && (
                  <img src={item.image} alt="Question" className="ml-2" />
                )}
              </div>
              <div className="space-y-2">
                {['A', 'B', 'C', 'D'].map((option, idx) => (
                  <div key={idx} className="flex items-center">
                    <input
                      onClick={handleQuestion}
                      type="radio"
                      value={idx + 1}
                      name={item.questionId}
                      id={item[`option${option}`]}
                    />
                    <label
                      htmlFor={item[`option${option}`]}
                      className="ml-2"
                      dangerouslySetInnerHTML={{
                        __html: item[`option${option}`]
                      }}
                    ></label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExamStage
