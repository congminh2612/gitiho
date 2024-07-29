import React from 'react'
import HeaderAdmin from './HeaderAdmin'
import SideBarAdmin from './SideBarAdmin'
import { Outlet } from 'react-router-dom'
const LayoutAdmin = () => {
  return (
    <div>
      <div>
        <HeaderAdmin />
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-1 bg-slate-600 h-[100vh]">
          <SideBarAdmin />
        </div>
        <div className="col-span-6">
          <div className="w-full h-[100vh] overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutAdmin
