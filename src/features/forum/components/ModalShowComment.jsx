import React from 'react'
import ModalBase from '../../../components/Modal/ModalBase'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getCommentByPost } from '../service/getCommentByPost'
import { BaseButton } from '../../../components/Button'
import { closeModal } from '../../../redux/slice/ModalSlice'

const ModalShowComment = () => {
  const dispatch = useDispatch()
  const modalInfo = useSelector((state) => state.modal.modalInfo)
  const postId = modalInfo?.postId
  const postFile = modalInfo?.postFile

  const { data: comments, isSuccess } = useQuery({
    queryKey: ['comment', postId],
    queryFn: () => getCommentByPost(postId)
  })
  console.log(comments)
  return (
    <ModalBase className="w-[800px]" handleClose={() => dispatch(closeModal())}>
      <div className="p-6">
        {postFile && <img src={postFile} alt="" width="90%" />}
        <div className="space-y-6 mt-10 h-[300px] overflow-auto">
          {isSuccess &&
            comments.map((cmt) => {
              return (
                <div
                  key={cmt.postCommentId}
                  className="flex items-center space-x-6 mr-6"
                >
                  <div className="size-10 rounded-full">
                    <img
                      src={cmt.avatar}
                      alt=""
                      width={50}
                      className="rounded-full"
                    />
                  </div>
                  <div className="bg-gray-200 rounded-lg text-gray-text text-sm py-2 px-4 w-full ml-2">
                    <p className="text-base font-semibold">{cmt.fullName}</p>
                    <p className="pt-1">{cmt.content}</p>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="text-right mr-10">
          <BaseButton title="Đóng" handleClick={() => dispatch(closeModal())} />
        </div>
      </div>
    </ModalBase>
  )
}

export default ModalShowComment
