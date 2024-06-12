import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaSquareFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from './services/signUp'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpScreen = () => {
  const schema = z.object({
    fullName: z.string().min(1, { message: "Không được để trống trường này" }),
    phoneNumber: z.string()
      .min(10, { message: "Số điện thoại không hợp lệ" })
      .max(11, { message: "Số điện thoại không hợp lệ" }),

    email: z.string().min(1, { message: "Không được để trống trường này" }).email({ message: "Email không hợp lệ" }),
  });
  const { handleSubmit, register, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess(data) {
      if (data.status == 200) {
        console.log(data)
        toast.success(data.message)
        navigate('/sign-in')
        reset('')
      }
    },
    onError(err) {
      toast.error("Xảy ra lỗi trong quá trình đăng ký")
    }
  })
  const onSubmit = (data) => {
    mutation.mutate(data)
  }
  return (
    <div className="max-w-[600px] mx-auto h-[900px] my-[100px] shadow-lg shadow-blue-400">
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{

          }}
        />
      </div>
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
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-7">
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="text"
                  placeholder="Họ và tên"
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className="ml-2 pt-2 text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="number"
                  placeholder="Số điện thoại"
                  {...register('phoneNumber')}
                />
                {errors.phoneNumber && (
                  <p className="ml-2 pt-2 text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="text"
                  placeholder="Email"
                  {...register('email')}

                />
                {errors.email && (
                  <p className="ml-2 pt-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="text"
                  placeholder="Trường"
                  {...register('schoolName')}
                />
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="text"
                  placeholder="Avatar"
                  {...register('avatar')}
                />
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="text"
                  placeholder="Trạng thái"
                  {...register('status')}
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
