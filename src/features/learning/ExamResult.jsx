import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { GetTestDetailByTestDetailId } from './services/exam';

const ExamResult = () => {
    const location = useLocation();
    let testDetailId = location.state.testDetailId;
    const [testDetail, setTestDetail] = useState([]);

    const handleGetData = async () => {
        try {
            const result = await GetTestDetailByTestDetailId(testDetailId);
            if (result.status === 200) {
                setTestDetail(result.data);
            }
        } catch (error) {
            console.error('Error fetching mod service:', error);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <div className='exam-finish p-4'>
            <div className='exam-finish-title flex items-center'>
                <img src={''} alt="Exam Icon" className='mr-4' />
                <p className='text-2xl font-bold'>Kết quả kiểm tra</p>
            </div>
            <div className='exam-finish-line w-64 h-px bg-gray-400 my-4'></div>
            {testDetail.map((item) => (
                <div key={item.id} className='exam-finish-result bg-white shadow-md rounded-lg p-6 mb-6'>
                    <h5 className='text-xl font-semibold mb-2'>{item.topicName}</h5>
                    <hr className='mb-4' />
                    <p className='mb-2'>Môn thi: <span className='font-medium'>{item.subjectName}</span></p>
                    <p className='mb-2'>Số câu hỏi: <span className='font-medium'>{item.totalQuestion} câu</span></p>
                    <p className='mb-2'>Thời gian: <span className='font-medium'>{item.duration} phút</span></p>
                    <p className='mb-2'>Số câu đúng: <span className={`${item.score < 5 ? 'text-red-500' : ''} font-medium`}>{item.answerRight}/{item.totalQuestion}</span></p>
                    <p className='mb-2'>Điểm: <span className={`${item.score < 5 ? 'text-red-500' : ''} font-medium`}>{item.score}</span></p>
                    {item.score < 5 ? (
                        <p className='italic text-red-500'>• Bạn cần cố gắng thêm để có kết quả tốt hơn</p>
                    ) : item.score >= 5 && item.score < 7 ? (
                        <p className='italic text-yellow-500'>• Điểm của bạn đang ở mức trung bình, cố gắng thêm chút nữa bạn nhé</p>
                    ) : (
                        <p className='italic text-green-500'>• Kết quả của bạn rất tốt, cố lên bạn nhé</p>
                    )}
                    <div className='exam-finish-result-button flex mt-4'>
                        <div className='exam-finish-result-button-other bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg mr-2 cursor-pointer' onClick={() => navigate('/')}>
                            Trang chủ
                        </div>
                        <div className='exam-finish-result-button-detail bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer' >
                            Chi tiết
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExamResult;
