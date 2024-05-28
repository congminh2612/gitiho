import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { news } from './services/news'

const NewsScreen = () => {
  const { data } = useQuery({ queryKey: ['news'], queryFn: news })
  console.log('data', data?.data)
  return (
    <div className="container mx-auto px-[100px] py-10 space-y-[100px]">
      {data?.data &&
        data?.data.map((item) => {
          return (
            <div key={item.newIds} className="flex space-x-2">
              <img src={item.image} width='700px' alt="" />
              <div className="pl-6">
                <p className="text-lg text-gray-1 font-semibold">
                  {item.title}
                </p>
                <div
                  className="text-sm pt-5"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default NewsScreen
