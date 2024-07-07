import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { users } from '../services/users'
import { IoIosInformationCircle } from 'react-icons/io'
import { BaseButton } from '../../../../components/Button'
import { useNavigate } from 'react-router-dom'

const UserAdminScreen = () => {
  const Roles = {
    1: 'Supper Admin',
    2: 'Admin',
    3: 'Mod',
    4: 'User'
  }
  const { data } = useQuery({ queryKey: ['users'], queryFn: users })
  const navigate = useNavigate()
  console.log(data)
  return (
    <div className="px-10 py-28">
      <table className="border-collapse border border-slate-500 w-full">
        <thead>
          <tr className="bg-s">
            <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl">
              Họ và tên
            </th>
            <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl w-[250px]">
              Email
            </th>
            <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl w-[180px]">
              Số điện thoại
            </th>
            <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl w-[180px]">
              Ảnh
            </th>
            <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl">
              Status
            </th>
            <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl">
              Roles
            </th>
            <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl w-[160px]">
              Thông tin
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.userList?.map((user) => {
            return (
              <tr key={user.accountId} className="hover:cursor-pointer">
                <td className="border border-slate-700 py-[20px] pl-[16px]">
                  {user.fullName}
                </td>
                <td className="border border-slate-700 py-[20px] pl-[16px]">
                  {user.email}
                </td>
                <td className="border border-slate-700 py-[20px] pl-[16px]">
                  {user.phone}
                </td>
                <td className="border border-slate-700 py-[20px] pl-[16px]">
                  <img src={user.avatar} alt="" />
                </td>
                <td className="border border-slate-700 py-[20px] pl-[16px]">
                  {user.status}
                </td>
                <td className="border border-slate-700 py-[20px] pl-[16px]">
                  {Roles[user.roleId]}
                </td>
                <td className="border border-slate-700 py-[12px] pl-[10px] ">
                  <BaseButton
                    title="Chi tiết"
                    className="bg-slate-700 px-8 py-[6px] hover:bg-slate-400"
                    handleClick={() => navigate(`${user.accountId}`)}
                  />
                  {/* <IoIosInformationCircle size='28' className='text-slate-700' /> */}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* {showConfirmationModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-8 rounded-lg">
                        <p>Bạn có chắc chắn muốn người dùng này trở thành ADMIN?</p>
                        <div className="mt-4 flex justify-end">
                            <BaseButton
                                title="Hủy"
                                className="mr-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                                handleClick={handleCancelMakeAdmin}
                            />
                            <BaseButton
                                title="Xác nhận"
                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                                handleClick={handleConfirmMakeAdmin}
                            />
                        </div>
                    </div>
                </div>
            )} */}
    </div>
  )
}

export default UserAdminScreen
