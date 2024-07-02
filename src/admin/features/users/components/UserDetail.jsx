import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { user } from '../services/userDetail'
import { useForm } from 'react-hook-form'
import TextInput from '../../../../components/Input/TextInput'
import { updateUser } from '../services/updateUser'
import toast, { Toaster } from 'react-hot-toast'

const UserDetail = () => {
  const { id } = useParams()
  const { data } = useQuery({ queryKey: ['user', id], queryFn: () => user(id) })
  console.log(data)
  const { register, setValue, watch } = useForm()
  const [initialValues, setInitialValues] = useState({})
  const watchedValues = watch()
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess(data) {
      if (data.status == 200) {
        toast.success('Cập nhật tài khoản thành công')
      }
    }
  })

  useEffect(() => {
    if (data) {
      const initialData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        status: data.status,
        schoolName: data.schoolName,
        avatar: data.avatar
      }
      setInitialValues(initialData)
      for (const key in initialData) {
        setValue(key, initialData[key])
      }
    }
  }, [data, setValue])

  const isChanged =
    JSON.stringify(initialValues) !== JSON.stringify(watchedValues)

  const handleUpdate = () => {
    const dataUpdate = {
      ...watchedValues,
      accountId: id
    }
    console.log(dataUpdate)
    mutation.mutate(dataUpdate)
  }

  return (
    <div>
      <div>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{}}
        />
        <form className="w-[550px] mx-auto">
          <div className="pt-10">
            <p className="text-2xl text-slate-700 font-semibold ">
              Thông tin tài khoản
            </p>
          </div>
          <div className="pt-10 space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName">Họ và tên</label>
              <TextInput
                className="bg-slate-200 w-[400px]"
                {...register('fullName')}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <TextInput
                className="bg-slate-200 w-[400px]"
                {...register('email')}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone">Số điện thoại</label>
              <TextInput
                className="bg-slate-200 w-[400px]"
                {...register('phone')}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status">Trạng thái</label>
              <TextInput
                className="bg-slate-200 w-[400px]"
                {...register('status')}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="school">Trường</label>
              <TextInput
                className="bg-slate-200 w-[400px]"
                {...register('schoolName')}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="avatar">Ảnh</label>
              <TextInput
                className="bg-slate-200 w-[400px]"
                {...register('avatar')}
              />
            </div>
          </div>
          <div className="pt-10">
            <button
              type="button"
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${!isChanged ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              onClick={handleUpdate}
              disabled={!isChanged}
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserDetail
