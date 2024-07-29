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

const PostStage = ({ status }) => {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.auth.currentUser)
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
  const handleOpenModal = (postId, postFile) => {
    dispatch(openModal({ postId, postFile }))
  }
  console.log(posts)
  return (
    <div>
      {isLoading && <div>Loading</div>}
      {posts && posts.length > 0 ? (
        <div>
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
                  <Comment postId={post.postId} />
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
