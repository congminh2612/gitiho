import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaSquareFacebook } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { signIn } from './services/signIn'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/slice/AuthSlice'

const SignInScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess(data) {
      if (data.status == 400) {
        toast.error(data.message)
      } else {
        const user = { account: data.data, token: data.token }
        navigate('/')
        dispatch(loginSuccess(user))
      }
    },
    onError(err) {}
  })
  const onSubmit = (data) => {
    mutation.mutate(data)
  }
  return (
    <div className="max-w-[600px] mx-auto h-[600px] my-[100px] shadow-xl shadow-blue-500">
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#363636',
              color: 'white'
            }
          }}
        />
      </div>
      <p className="text-center pt-10 text-2xl text-[#334d6e;]">ĐĂNG NHẬP</p>
      <div className="flex flex-col justify-center items-center pt-6">
        <p className="pt-8 text-gray-700">Hoặc đăng nhập</p>
        <div className="pt-8">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-7">
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="text"
                  placeholder="Email hoặc số điện thoại"
                  {...register('email')}
                />
              </div>
              <div>
                <input
                  className="border-[1px] border-gray-700 px-3 py-[8px] rounded-md focus:border-red-500 outline-none"
                  type="password"
                  placeholder="Mật khẩu"
                  {...register('password')}
                />
              </div>
            </div>
            <div className="pt-10">
              <button className="bg-red-500 text-white  py-[6px] px-6 rounded-lg  w-full">
                ĐĂNG NHẬP
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-between space-x-6 text-sm text-blue-500 pt-3">
          <p className="cursor-pointer">Lấy lại mật khẩu</p>
          <Link to="/sign-up">
            <p className="cursor-pointer">Đăng ký tài khoản</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignInScreen
