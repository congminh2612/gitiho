import React from 'react'
import ModalBase from '../../../../components/Modal/ModalBase'
import BaseButton from '../../../../components/Button/BaseButton'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../../redux/slice/ModalSlice'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeStatusUser } from '../../../services/changeStatus'

const ModalUnbanAccount = () => {
  const dispatch = useDispatch()
  const modalInfo = useSelector((state) => state.modal.modalInfo)
  const queryClient = useQueryClient()
  const accountId = modalInfo?.accountId ?? ''
  const status = 'Đang hoạt động'

  const mutation = useMutation({
    mutationFn: () => ChangeStatusUser(accountId, status),
    onSuccess(data) {
      if (data.status == 200) {
        toast.success('Đã mở tài khoản người dùng này')
        queryClient.invalidateQueries()
        dispatch(closeModal())
      }
    },
    onError(err) {
      console.log(err)
    }
  })
  const handleUnBanAccount = () => {
    mutation.mutate()
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <ModalBase>
        <div>
          <p>
            Bạn có chắc chắn muốn mở tài khoản{' '}
            <span className="text-primary font-medium">
              {modalInfo?.email}{' '}
            </span>{' '}
            không
          </p>
          <div className="pt-8 space-x-4 text-right">
            <BaseButton
              handleClick={() => dispatch(closeModal())}
              title="Cancel"
              className="py-[6px] px-4 bg-slate-600 hover:bg-slate-400"
            />
            <BaseButton
              handleClick={handleUnBanAccount}
              title="Ok"
              className="py-[6px] px-4 hover:bg-red-400"
            />
          </div>
        </div>
      </ModalBase>
    </div>
  )
}

export default ModalUnbanAccount
