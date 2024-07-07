import React, { useState } from 'react'

const Question = ({ index, question, onAnswerSelect, showAnswer }) => {
  const { questionContext, optionA, optionB, optionC, optionD, answerName } =
    question
  const [selectedOption, setSelectedOption] = useState(null)

  // Define options here
  const options = [
    { label: 'A', content: optionA },
    { label: 'B', content: optionB },
    { label: 'C', content: optionC },
    { label: 'D', content: optionD }
  ]

  const correctAnswer = answerName
  const isCorrect =
    selectedOption !== null && options[selectedOption].label === correctAnswer
  const handleOptionClick = (index) => {
    setSelectedOption(index)
    onAnswerSelect(question.questionId, options[index].label)
  }

  return (
    <div className="">
      <div className="flex space-x-2">
        <p className="text-lg font-semibold text-gray-text">Câu {index}:</p>
        <p
          className="text-lg font-medium w-[400px] text-gray-text h-[150px]"
          dangerouslySetInnerHTML={{ __html: questionContext }}
        ></p>
      </div>
      <div className="flex flex-col space-y-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`flex space-x-4 border-[1px] border-gray-text text-gray-text w-[450px] px-4 py-2 rounded-xl ${showAnswer ? 'pointer-events-none' : ''} cursor-pointer ${
              selectedOption === index ? 'bg-blue-200' : 'bg-gray-200'
            } ${showAnswer && !isCorrect && option.label === correctAnswer ? 'bg-red-200 pointer-events-none' : ''}
                        ${showAnswer && selectedOption === index && isCorrect ? 'bg-green-200 pointer-events-none' : ''}`}
          >
            <p>{option.label} :</p>
            <p dangerouslySetInnerHTML={{ __html: option.content }}></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Question
