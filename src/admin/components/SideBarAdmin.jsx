import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BsPersonFillGear } from 'react-icons/bs'
import { PiShoppingCartSimpleBold } from 'react-icons/pi'
import { FaQuestion } from 'react-icons/fa6'
import { PiNewspaperClippingDuotone } from 'react-icons/pi'
import { MdOutlineTopic } from 'react-icons/md'

const SidebarLink = ({ to, children }) => {
  const location = useLocation()
  const isActive = location.pathname.substring(7) === `${to}`

  return (
    <Link to={to}>
      <div
        className={`flex pl-8 py-3 mt-6 space-x-6 items-center hover:bg-slate-400 hover:cursor-pointer ${
          isActive ? 'bg-slate-400' : ''
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
      <div className="pt-[80px] space-y-8">
        <SidebarLink to="users">
          <BsPersonFillGear size={28} />
          <p className="text-xl pt-[2px]">User</p>
        </SidebarLink>
        <SidebarLink to="learning">
          <PiShoppingCartSimpleBold size={28} />
          <p className="text-xl pt-[2px]">Learning</p>
        </SidebarLink>
        <SidebarLink to="question">
          <FaQuestion size={28} />
          <p className="text-xl pt-[2px]">Question</p>
        </SidebarLink>
        <SidebarLink to="topic">
          <MdOutlineTopic size={28} />
          <p className="text-xl pt-[2px]">Topic</p>
        </SidebarLink>
        <SidebarLink to="news">
          <PiNewspaperClippingDuotone size={28} />
          <p className="text-xl pt-[2px]">News</p>
        </SidebarLink>
      </div>
    </div>
  )
}

export default SideBarAdmin
