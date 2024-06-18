import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { newDetail } from './services/newDetail'

const NewDetail = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['newDetails', id],
    queryFn: () => newDetail(id)
  })
  console.log(data)
  return (
    <div className="container mx-auto">
      <p className="text-center text-2xl font-bold mt-10">
        {data?.data?.title}
      </p>
      <img src={data?.data?.image} width="700px" alt="" />
      <div
        className="text-sm pt-5"
        dangerouslySetInnerHTML={{ __html: data?.data?.content }}
      />
    </div>
  )
}

export default NewDetail
