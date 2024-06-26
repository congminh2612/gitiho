import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineMail } from 'react-icons/ai'
import { IoPerson } from 'react-icons/io5'
import TextInput from '../../components/Input/TextInput'

const HeaderAdmin = () => {
  return (
    <div className=" py-6 pr-[100px] bg-slate-200 pl-[20px] flex items-center justify-between border-b-2 border-gray-300">
      <div className="flex items-center space-x-[50px] relative">
        <p className="text-3xl font-semibold">CMS GITIHO</p>
        <TextInput
          className="py-2 ml-[70px] w-[400px] bg-white"
          placeholder="Seacrh"
        />
        <AiOutlineSearch size={24} className="absolute right-1" />
      </div>
      <div className="flex space-x-7 items-center">
        <div className="flex space-x-6">
          <IoIosNotificationsOutline size="28" />
          <AiOutlineMail size="28" />
        </div>
        <div className="flex items-center space-x-6">
          <IoPerson size={28} />
          <p>Xin chào Admin</p>
        </div>
      </div>
    </div>
  )
}

export default HeaderAdmin
