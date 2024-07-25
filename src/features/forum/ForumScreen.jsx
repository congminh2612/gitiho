import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { getPostByStatus } from './service/getPostByStatus'
import PostStage from './components/PostStage'

const categories = [
  { id: 1, name: 'Tất cả bài viết', status: 'all' },
  { id: 2, name: 'Bài viết của tôi', status: 'Approve' },
  { id: 3, name: 'Chờ phê duyệt', status: 'Pending' },
  { id: 4, name: 'Bị từ chối', status: 'Rejected' }
]

const ForumScreen = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full">
        <TabGroup>
          <TabList className="flex gap-8 w-full items-center justify-center mt-10">
            {categories.map(({ name, status }) => (
              <Tab
                key={status}
                className="rounded-md py-1 px-3 text-lg font-semibold text-gray-text bg-gray-200 bg-opacity-65 shadow-md focus:outline-none data-[selected]:bg-primary data-[selected]:text-white"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-6 flex flex-col justify-center items-center space-y-6">
            {categories.map(({ status }) => (
              <TabPanel key={status} className="rounded-xl bg-white/5 p-3">
                <PostStage status={status} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  )
}

export default ForumScreen
