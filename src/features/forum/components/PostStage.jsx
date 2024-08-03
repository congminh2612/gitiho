import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getAllPost } from '../service/getAllPost'
import { getPostByStatus } from '../service/getPostByStatus'
import { useDispatch, useSelector } from 'react-redux'
import { GoHeart } from 'react-icons/go'
import { FaRegComment } from 'react-icons/fa6'
import { GoHeartFill } from 'react-icons/go'
import { unlike } from '../service/unlike'
import { like } from '../service/like'
import ModalShowComment from './ModalShowComment'
import { openModal } from '../../../redux/slice/ModalSlice'
import Comment from './Comment'
import { BaseButton } from '../../../components/Button'
import { ChangeStatusPost } from '../../../admin/services/changeStatus'
import { notification } from 'antd'

const PostStage = ({ status }) => {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.auth.currentUser)
  const role = account?.account?.roleId ?? 4
  console.log(role)
  const queryClient = useQueryClient()
  const accountId = account?.account?.accountId ?? ''
  const {
    data: posts,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['posts', status, accountId],
    queryFn:
      status === 'all' ? getAllPost : () => getPostByStatus(status, accountId)
  })
  console.log(posts)
  const mutationLike = useMutation({
    mutationFn: (postId) => like(postId, accountId),
    onSuccess(data) {
      queryClient.invalidateQueries()
    },
    onError(e) {
      console.log(e)
    }
  })
  const mutationUnlike = useMutation({
    mutationFn: (postId) => unlike(postId, accountId),
    onSuccess(data) {
      queryClient.invalidateQueries()
    },
    onError(e) {}
  })
  const checkIsLiked = (postLikes) => {
    return postLikes.some((like) => like.accountId === accountId)
  }
  const [api, contextHolder] = notification.useNotification()
  const openNotificationApprovedPost = (placement) => {
    api.success({
      message: 'Thông báo',
      description: 'Bài viết đã được phê duyệt !',
      placement
    })
  }

  const openNotificationRejectedPost = (placement) => {
    api.error({
      message: 'Thông báo',
      description: 'Bài viết đã bị từ chối !',
      placement
    })
  }

  const openNotificationDeletedPost = (placement) => {
    api.success({
      message: 'Thông báo',
      description: 'Bài viết đã được xóa thành công !',
      placement
    })
  }
  const handleOpenModal = (postId, postFile) => {
    dispatch(openModal({ postId, postFile }))
  }
  const handleApprove = async (post) => {
    await ChangeStatusPost(post.postId, 'Approved')
    queryClient.invalidateQueries()
    openNotificationApprovedPost('topRight')
  }
  const handleRejectedPost = async (post) => {
    await ChangeStatusPost(post.postId, 'Rejected')
    openNotificationRejectedPost('topRight')
    queryClient.invalidateQueries()
  }
  const handleDelete = async (postId) => {}
  return (
    <div>
      {isLoading && <div>Loading</div>}
      {posts && posts.length > 0 ? (
        <div>
          {contextHolder}
          {posts.map((post) => {
            const isLiked = checkIsLiked(post.postlikes)
            return (
              <div key={post.postId} className="bg-white shadow-md p-8">
                <div className="flex justify-between">
                  <div className="flex">
                    <p className="font-bold text-primary">{post.fullName} :</p>
                    <p className="text-base ml-2 text-primary">
                      {post.postText}
                    </p>
                  </div>
                  <p className="text-xl font-bold">{post.subjectName}</p>
                </div>
                <img src={post.postFile} alt="" width="100%" className="pt-6" />
                <div className="flex items-center space-x-4 mt-6">
                  <div className="relative">
                    {isLiked ? (
                      <GoHeartFill
                        size="24"
                        color="red"
                        className="cursor-pointer hover:text-red-200"
                        onClick={() => mutationUnlike.mutate(post.postId)}
                      />
                    ) : (
                      <GoHeart
                        size="24"
                        className="cursor-pointer"
                        onClick={() => mutationLike.mutate(post.postId)}
                      />
                    )}
                    <div className="absolute size-5 bg-primary flex justify-center items-center text-white text-sm rounded-full -top-3 -right-3">
                      {post.postlikes.length}
                    </div>
                  </div>

                  <div
                    className="relative cursor-pointer"
                    onClick={() => handleOpenModal(post.postId, post.postFile)}
                  >
                    <FaRegComment size="24" />
                    <div className="absolute size-5 bg-primary flex justify-center items-center text-white text-sm rounded-full -top-3 -right-3">
                      {post.countComment}
                    </div>
                  </div>
                </div>
                <div>
                  {role != 2 && role != 1 && <Comment postId={post.postId} />}
                </div>
                <div>
                  {(role == 1 || role == 2) && (
                    <div className="space-x-4 pt-10">
                      {post.status != 'Approved' && (
                        <BaseButton
                          handleClick={() => handleApprove(post)}
                          className="py-[6px] px-4 hover:opacity-75 bg-green-700"
                          title="Duyệt"
                        />
                      )}
                      {post.status == 'Pending' && (
                        <BaseButton
                          handleClick={() => handleRejectedPost(post)}
                          className="py-[6px] px-4 hover:opacity-75"
                          title="Từ chối"
                        />
                      )}
                      <BaseButton
                        handleClick={() => handleDelete(post)}
                        className="py-[6px] px-4 hover:opacity-75 bg-slate-700"
                        title="Xóa bài"
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          <p>Chưa có bài viết nào</p>
        </div>
      )}
      <ModalShowComment />
    </div>
  )
}

export default PostStage
