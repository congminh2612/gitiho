import React from 'react'
import BannerSlider from './components/BannerSlider'
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {
  const navigate = useNavigate()
  return (
    <div>
      <BannerSlider />
      <div
        className="container mx-auto px-[100px]"
        onClick={() => navigate('/courses')}
      >
        <p className="text-xl pt-10 font-bold">Khóa học ưu dãi</p>
        <div className="grid grid-cols-4 gap-8 pt-6">
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2023/11_14/image_4bf826349c4c0b32f9a844fc338c5f1e.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2023/11_14/image_4bf826349c4c0b32f9a844fc338c5f1e.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2023/11_14/image_4bf826349c4c0b32f9a844fc338c5f1e.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2023/11_14/image_4bf826349c4c0b32f9a844fc338c5f1e.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
        </div>
      </div>
      <div
        className="container mx-auto px-[100px] pt-10"
        onClick={() => navigate('/courses')}
      >
        <p className="text-xl pt-10 font-bold">Khóa học đựơc nhiều người đọc</p>
        <div className="grid grid-cols-4 gap-8 pt-6">
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2022/03_16/image_40a2eb5c46cff003f19216c46d987e8f.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2022/03_16/image_40a2eb5c46cff003f19216c46d987e8f.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2022/03_16/image_40a2eb5c46cff003f19216c46d987e8f.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2022/03_16/image_40a2eb5c46cff003f19216c46d987e8f.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
        </div>
      </div>
      <div
        className="container mx-auto px-[100px]"
        onClick={() => navigate('/courses')}
      >
        <p className="text-xl pt-10 font-bold">Khóa học ưu dãi</p>
        <div className="grid grid-cols-4 gap-8 pt-6">
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2023/11_14/image_4bf826349c4c0b32f9a844fc338c5f1e.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2023/11_14/image_4bf826349c4c0b32f9a844fc338c5f1e.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2023/11_14/image_4bf826349c4c0b32f9a844fc338c5f1e.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
          <div className="col-span-1">
            <img
              src="https://gitiho.com/caches/cc_medium/cou_avatar/2023/11_14/image_4bf826349c4c0b32f9a844fc338c5f1e.jpg"
              alt=""
            />
            <p>Chiến lược quản lí toàn thời gian chu toàn một việc</p>
            <p>9.900 đ</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
