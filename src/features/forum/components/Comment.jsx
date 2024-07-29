import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextInput from '../../../components/Input/TextInput'
import { IoMdSend } from 'react-icons/io'
import { addComment } from '../service/addComment'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ModalShowComment from './ModalShowComment'
import { openModal } from '../../../redux/slice/ModalSlice'

const Comment = ({ postId }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const account = useSelector((state) => state.auth.currentUser.account)
  const accountId = account?.accountId

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess(data) {
      setContent('')
      queryClient.invalidateQueries()
      dispatch(openModal({ postId }))
    },
    onError(e) {
      console.log(e)
    }
  })

  const handleSubmit = async () => {
    const data = {
      accountId: accountId,
      postId: postId,
      content: content
    }
    mutation.mutate(data)
  }

  return (
    <div>
      <div className="flex items-center space-x-4">
        <img
          src={account?.avatar}
          alt="Avatar"
          width={50}
          className="rounded-full"
        />
        <textarea
          rows={2}
          placeholder="Nhập bình luận"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-white w-full px-2 py-1 border-2 border-gray-500 rounded-lg"
        />
        <div>
          <IoMdSend
            size="28"
            onClick={handleSubmit}
            className="cursor-pointer"
          />
        </div>
      </div>
      <ModalShowComment />
    </div>
  )
}

export default Comment
