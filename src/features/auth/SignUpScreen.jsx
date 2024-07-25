import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaSquareFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from './services/signUp'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import RadioInput from '../../components/Radio/RadioInput'
import RadioController from '../../components/Radio/RadioController'
import { getAllEmail } from './services/getAllEmail'
import { getAllPhone } from './services/getAllPhone'
import { validateRegister } from './utils/validateRegister'

const SignUpScreen = () => {
  const schema = z.object({
    fullName: z.string().min(1, { message: 'Không được để trống trường này' }),
    phoneNumber: z
      .string()
      .min(10, { message: 'Số điện thoại không hợp lệ' })
      .max(11, { message: 'Số điện thoại không hợp lệ' }),

    email: z
      .string()
      .min(1, { message: 'Không được để trống trường này' })
      .email({ message: 'Email không hợp lệ' }),
    gender: z.string()
  })
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver({
      ...schema
    })
  })
  const { data: emails, isSuccess: isSuccessEmail } = useQuery({
    queryKey: ['emails'],
    queryFn: getAllEmail
  })
  const { data: phones, isSuccess: isSuccessPhone } = useQuery({
    queryKey: ['phones'],
    queryFn: getAllPhone
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess(data) {
      if (data.status == 200) {
        console.log(data)
        toast.success(
          'Đăng ký thành công tài khoản thành công , vui lòng check email của bạn',
          {
            duration: 5000
          }
        )
        reset()
      }
    },
    onError(err) {
      toast.error('Xảy ra lỗi trong quá trình đăng ký')
    }
  })
  const onSubmit = (data) => {
    if (isSuccessEmail && isSuccessPhone) {
      console.log(data)
      if (
        phones.includes(data.phoneNumber) ||
        emails.data.includes(data.email)
      ) {
        toast.error('Số điện thoại hoặc email của bạn đã được đăng ký')
      } else {
        mutation.mutate(data)
      }
    }
  }
  return (
    <div className="max-w-[600px] mx-auto h-[600px] my-[100px] shadow-lg shadow-blue-400">
      <div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              width: '500px',
              borderRadius: '8px',
              background: '#333',
              color: '#fff'
            }
          }}
        />
      </div>
      <p className="text-center pt-10 text-2xl text-[#334d6e;]">ĐĂNG KÝ</p>
      <div className="flex flex-col justify-center items-center ">
        <div className="pt-8">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-7">
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none w-full"
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
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none w-full"
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
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none w-full"
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
              <div className="flex space-x-6">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    value="female"
                    id="female"
                    {...register('gender')}
                  />
                  <label htmlFor="female">nữ</label>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    value="male"
                    id="male"
                    {...register('gender')}
                  />
                  <label htmlFor="male">nam</label>
                </div>
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none w-full"
                  type="text"
                  placeholder="Trường"
                  {...register('schoolName')}
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
