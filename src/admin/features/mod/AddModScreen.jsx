import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import TextInput from '../../../components/Input/TextInput'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { BaseButton } from '../../../components/Button'
import { convertDateToYYYYMMDD } from '../../../utils/date'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addMod } from '../../services/addMod'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getAllEmail } from '../../../features/auth/services/getAllEmail'
import { getAllPhone } from '../../../features/auth/services/getAllPhone'
import { MdOutlineAttractions } from 'react-icons/md'

const AddModScreen = () => {
    const schema = z.object({
        fullName: z.string().min(1, { message: 'Không được để trống trường này' }),
        phone: z
            .string()
            .min(10, { message: 'Số điện thoại không hợp lệ' })
            .max(11, { message: 'Số điện thoại không hợp lệ' }),

        email: z
            .string()
            .min(1, { message: 'Không được để trống trường này' })
            .email({ message: 'Email không hợp lệ' }),

    })
    const [startDate, setStartDate] = useState();
    const [errorDate, setErrorDate] = useState('')
    const refErrorDate = useRef('')
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
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


    const mutation = useMutation({
        mutationFn: addMod,
        onSuccess(data) {
            if (data.status == 200) {
                toast.success("Thêm tài khoản thành công")
                queryClient.invalidateQueries()
                reset()
            }
        },
        onError(err) {
            console.log(err)
        }
    })

    const onSubmit = (data) => {
        console.log(startDate)
        if (!startDate) {
            setErrorDate('Trường này không được để trống')
            refErrorDate.current = 'Trường này không được để trống'
        }
        if (startDate) {
            setErrorDate('')
        }

        const newData = {
            ...data,
            birthDay: startDate ? convertDateToYYYYMMDD(startDate) : ''
        }
        if (isSuccessEmail && isSuccessPhone) {
            console.log(data)
            if (
                phones.includes(data.phone) ||
                emails.data.includes(data.email)
            ) {
                toast.error('Số điện thoại hoặc email của bạn đã được đăng ký')
            } else {
                mutation.mutate(newData)
                setStartDate('')
            }
        }
    }

    return (
        <div>
            <div>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                    toastOptions={{}}
                />
                <form className="w-[550px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className="pt-10">
                        <p className="text-2xl text-slate-700 font-semibold ">
                            Thêm tài khoản mod
                        </p>
                    </div>
                    <div className="pt-10 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="fullName">Họ và tên</label>
                            <TextInput
                                className="bg-slate-200 w-[400px]"
                                {...register('fullName')}
                            />
                            {errors.fullName && (
                                <p className="ml-2 pt-2 text-sm text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email">Email</label>
                            <TextInput
                                className="bg-slate-200 w-[400px]"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="ml-2 pt-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone">Số điện thoại</label>
                            <TextInput
                                className="bg-slate-200 w-[400px]"
                                {...register('phone')}
                            />
                            {errors.phone && (
                                <p className="ml-2 pt-2 text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone">Ngày sinh</label>
                            <div>
                                <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            {errorDate !== '' ? (
                                <p className="ml-2 pt-2 text-sm text-red-500">
                                    {errorDate}
                                </p>
                            ) : ''}



                        </div>
                    </div>
                    <div className="pt-10">
                        <BaseButton title='Thêm mới' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddModScreen