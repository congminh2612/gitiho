import React from 'react'
import { IoMdSearch } from 'react-icons/io'
import { FaCartShopping } from 'react-icons/fa6'
import { headerNavigateItem } from './constants'
import { Link, useNavigate } from 'react-router-dom'
import { BaseButton } from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdPerson } from "react-icons/io";
import Menu from '../Menu/Menu'
import { logoutSuccess } from '../../redux/slice/AuthSlice'
const Header = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutSuccess())
    navigate('/sign-in')
  }
  return (
    <div className="">
      <div className="container mx-auto flex items-center py-6 justify-between px-[100px] ">
        <div className="flex space-x-10">
          <img
            src="https://gitiho.com/frontend/img/gitiho/logo.png"
            width="100px"
            alt="logo"
          />
          <div className="relative">
            <div className="">
              <input
                className="w-[400px] border-[1px] border-gray-400 rounded-lg py-[6px] px-3 bg-gray-100"
                type="text"
                placeholder="Tìm khóa học giảng viên"
              />
            </div>

            <div className="absolute top-[7px] right-2 ">
              <IoMdSearch size="26px" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div>
            <BaseButton title="Đăng ký khóa học" />
          </div>
          <div>
            <FaCartShopping />
          </div>
          <div>
            {currentUser ? (
              <div className='flex items-center space-x-4' >
                <Menu
                  icon={<IoMdPerson size="24" />}
                  items={[
                    { label: 'Profile', },
                    { label: 'Settings', },
                    { label: 'Logout', onClick: () => handleLogout() },
                  ]}
                />

                <p> {currentUser.account.fullName}</p>
              </div>
            ) : (
              <div>
                <BaseButton
                  handleClick={() => navigate('sign-in')}
                  title="Đăng ký/ Đăng nhập"
                  className="bg-gray-200 text-gray-text border-[1px] hover:bg-primary hover:text-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#21283e]">
        <div className="container mx-auto px-[100px] py-3 space-x-8 flex">
          {headerNavigateItem.map((item) => {
            return (
              <Link key={item.id} to={item.link}>
                <p
                  key={item.id}
                  className="text-white font-medium hover:text-primary cursor-pointer"
                >
                  {item.label}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Header
