import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPostByStatus } from '../../../features/forum/service/getPostByStatus';
import { Breadcrumb, Layout } from 'antd'
import { getAllPost } from '../../../features/forum/service/getAllPost';
import PostStage from '../../../features/forum/components/PostStage';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
const ForumAdminScreen = () => {

    const categories = [
        { id: 1, name: 'Chờ phê duyệt', status: 'Pending' },
        { id: 2, name: 'Đã phê duyệt', status: 'Approved' },
        { id: 3, name: 'Bị từ chối', status: 'Rejected' }
    ]
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

export default ForumAdminScreen