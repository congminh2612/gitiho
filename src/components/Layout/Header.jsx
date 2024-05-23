import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { headerNavigateItem } from './constants';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className=''>
      <div className='container mx-auto flex items-center py-6 justify-between px-[100px] ' >
        <div className="flex space-x-10">
          <img src="https://gitiho.com/frontend/img/gitiho/logo.png" width='100px' alt="logo" />
          <div className='relative'>
            <div className=''>
              <input className='w-[400px] border-[1px] border-gray-400 rounded-lg py-[6px] px-3 bg-gray-100' type="text" placeholder='Tìm khóa học giảng viên' />
            </div>

            <div className='absolute top-[7px] right-2 '>
              <IoMdSearch size='26px' />
            </div>

          </div>
        </div>

        <div className='flex items-center space-x-8'>
          <div>
            <button className='bg-red-500 text-white rounded-2xl px-2 py-1 hover:text-gray-300'>Kích hoạt khóa học</button>
          </div>
          <div>
            <FaCartShopping />
          </div>
          <div>
            <div>
              <button className='bg-gray-100 text-slate-600 rounded-2xl px-2 py-1 hover:text-white hover:bg-red-500'><Link to='sign-in'>Đăng ký/Đăng nhập</Link></button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#21283e]'>
        <div className='container mx-auto px-[100px] py-3 space-x-6 flex'>
          {headerNavigateItem.map((item) => {
            return (
              <p key={item.id} className='text-white'>
                {item.label}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Header
