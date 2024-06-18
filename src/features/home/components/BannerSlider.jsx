import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'

const BannerSlider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="bg-primary">
            <img
              src="https://gitiho.com/images/banner/2024/05_13/c4079c36085fd5947eccaa8fd60e0883.png"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-primary">
            <img
              src="https://gitiho.com/images/banner/2024/05_13/c4079c36085fd5947eccaa8fd60e0883.png"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-blue-400">
            <img
              src="https://gitiho.com/images/banner/2024/05_13/c4079c36085fd5947eccaa8fd60e0883.png"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-400">
            <img
              src="https://gitiho.com/images/banner/2024/05_13/c4079c36085fd5947eccaa8fd60e0883.png"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-green-400">
            <img
              src="https://gitiho.com/images/banner/2024/05_13/c4079c36085fd5947eccaa8fd60e0883.png"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default BannerSlider
