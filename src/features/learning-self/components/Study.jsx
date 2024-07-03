import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetQuestionByTopic } from '../services/getQuestionByTopic'
import Question from '../../questions/components/Question'
import useQuiz from '../../../hooks/useQuiz'
import { BaseButton } from '../../../components/Button'
import ModalBase from '../../../components/Modal/ModalBase'
import { useDispatch } from 'react-redux'
import { closeModal, openModal } from '../../../redux/slice/ModalSlice'

const Study = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [showAnswers, setShowAnswers] = useState(false);
    const { data: questions } = useQuery({
        queryKey: ['questions', id],
        queryFn: () => GetQuestionByTopic(id)
    })

    const handleModalOpen = () => {
        handleSubmit();
        dispatch(openModal())

    };
    const handleShowAnswers = () => {
        dispatch(closeModal())
        setShowAnswers(true);
    };

    const handleRestart = () => {
        setShowAnswers(false);
        setSelectedOption(null);
    };

    const { answers, score, handleAnswerSelect, handleSubmit } = useQuiz(
        questions ? questions.data : []
    )
    console.log(answers)
    return (
        <div className="container mx-auto px-[100px]">
            <div>
                <p className="text-center text-3xl text-red-600 mt-10 ">
                    Câu hỏi ôn tập
                </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-8 ml-10">
                {questions &&
                    questions.data.map((question, index) => {
                        return (
                            <div key={question.questionId}>
                                <Question
                                    index={index + 1}
                                    question={question}
                                    onAnswerSelect={handleAnswerSelect}
                                    showAnswer={showAnswers}
                                />
                            </div>
                        )
                    })}
            </div>

            <div className='text-right mt-6 mr-[150px]'>
                <BaseButton
                    handleClick={handleModalOpen}
                    title="Kiểm tra kết quả"
                    className="px-8 py-2 bg-blue-500 rounded-xl"
                />
                <BaseButton
                    disable={score === null}
                    handleClick={handleRestart}
                    title="Học lại"
                    className={`ml-4 px-8 py-2 bg-yellow-500 rounded-xl ${score === null ? 'hidden' : ''}`}
                />
            </div>
            <ModalBase>
                {score !== null && (
                    <>
                        <p>Chúc mừng bạn đã đúng {score} trên {questions.data.length} câu</p>
                        <p>Số điểm bạn đạt được: <span className='text-lg ml-1 text-red-500'>{parseInt((10 * score) / questions.data.length)}</span></p>
                    </>
                )}
                <div className='flex items-center justify-between mt-4'>
                    <BaseButton title='OK' handleClick={() => dispatch(closeModal())} className="px-4 py-[5px] bg-red-500 text-white  rounded-xl" />
                    <BaseButton handleClick={handleShowAnswers} title="Xem đáp án" className=' px-4 py-[5px] bg-slate-600 rounded-xl' />
                </div>

            </ModalBase>
        </div>
    )
}

export default Study
