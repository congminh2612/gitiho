import React from 'react'
import { FaSquareFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const SignUpScreen = () => {
  return (
    <div className="max-w-[600px] mx-auto h-[700px] my-[100px] shadow-lg shadow-blue-400">
      <p className="text-center pt-10 text-2xl text-[#334d6e;]">ĐĂNG NHẬP</p>
      <div className="flex flex-col justify-center items-center pt-6">
        <div>
          <button className="bg-white border-[1px] border-  text-slate-600 py-[6px] px-8 rounded-lg flex items-center ">
            Đăng nhập bằng google
            <span className="pl-2">
              <FcGoogle size="24px" />
            </span>
          </button>
        </div>
        <div className="pt-5">
          <button className="bg-blue-500 text-white   py-[6px] px-6 rounded-lg flex items-center ">
            Đăng nhập bằng facebook
            <span className="pl-2">
              <FaSquareFacebook size="24px" />
            </span>
          </button>
        </div>
        <p className="pt-8 text-gray-700">Hoặc đăng nhập</p>
        <div className="pt-8">
          <form action="">
            <div className="space-y-7">
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="text"
                  placeholder="Họ và tên"
                />
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="password"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="password"
                  placeholder="Mật khẩu đăng nhập"
                />
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
            </div>
            <div className="pt-10">
              <button className="bg-red-500 text-white  py-[6px] px-6 rounded-lg  w-full">
                ĐĂNG KÝ
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-start text-sm text-blue-500 pt-3">
          <Link to="/sign-in">
            <p className="cursor-pointer">Đăng nhập tài khoản</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpScreen
