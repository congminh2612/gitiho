import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BsPersonFillGear } from 'react-icons/bs'
import { PiNewspaperClippingDuotone } from 'react-icons/pi'
import { MdOutlineTopic } from 'react-icons/md'
import { GrUserAdmin } from 'react-icons/gr'
import { IoMdHome } from 'react-icons/io'
import { MdForum } from "react-icons/md";

const SidebarLink = ({ to, children }) => {
  const location = useLocation()
  const isActive = location.pathname.substring(7) === `${to}`

  return (
    <Link to={to}>
      <div
        className={`flex pl-8 py-3 mt-6 space-x-6 items-center hover:bg-slate-400 hover:cursor-pointer ${isActive ? '' : ''
          }`}
      >
        {children}
      </div>
    </Link>
  )
}

const SideBarAdmin = () => {
  return (
    <div className="h-[100vh]  border-r-2 border-gray-300">
      <div className="pt-[80px] space-y-8 ">
        <SidebarLink to="users">
          <IoMdHome className="text-white" size={28} />
          <p className="text-base pt-[2px] text-white">Trang chủ</p>
        </SidebarLink>
        <SidebarLink to="users">
          <BsPersonFillGear className="text-white" size={28} />
          <p className="text-base pt-[2px] text-white">Quản lí người dùng</p>
        </SidebarLink>
        <SidebarLink to="mod">
          <GrUserAdmin className="text-white" size={28} />
          <p className="text-base pt-[2px] text-white">Quản lí mod</p>
        </SidebarLink>
        <SidebarLink to="topic">
          <MdOutlineTopic className="text-white" size={28} />
          <p className="text-base pt-[2px] text-white">Quản lí topic </p>
        </SidebarLink>
        <SidebarLink to="forum">
          <MdForum className="text-white" size={28} />
          <p className="text-base pt-[2px] text-white">Quản lí diễn đàn </p>
        </SidebarLink>
        <SidebarLink to="news">
          <PiNewspaperClippingDuotone className="text-white" size={28} />
          <p className="text-base pt-[2px] text-white">Quản lí tin tức</p>
        </SidebarLink>
      </div>
    </div>
  )
}

export default SideBarAdmin
