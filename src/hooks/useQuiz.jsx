import { useState } from 'react'

const useQuiz = (questions) => {
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(null)

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer
    }))
  }
  const handleSubmit = () => {
    let correctAnswer = 0
    questions.forEach((question) => {
      if (answers[question.questionId] === question.answerName) {
        correctAnswer += 1
      }
    })
    setScore(correctAnswer)
  }
  return {
    answers,
    score,
    handleAnswerSelect,
    handleSubmit
  }
}
export default useQuiz
