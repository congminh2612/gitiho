import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { users } from '../../../services/users'
import { useNavigate } from 'react-router-dom'
import { Table, Input, Button } from 'antd'
import {
  SearchOutlined,
  EditOutlined,
  PoweroffOutlined
} from '@ant-design/icons'
import ModalBanAccount from './ModalBanAccount'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../../redux/slice/ModalSlice'
import ModalUnbanAccount from './ModalUnbanAccount'

const UserAdminScreen = () => {
  const { data, isSuccess } = useQuery({ queryKey: ['users'], queryFn: users })
  const [modalBan, setModalBan] = useState(true)
  const dispatch = useDispatch()
  const pagination = {
    pageSize: 5,
    total: isSuccess ? data.userList?.length : ''
  }

  const navigate = useNavigate()
  const columns = [
    {
      title: 'ID',
      dataIndex: 'accountId',
      key: 1,
      fixed: 'left'
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      fixed: 'left',
      render: (record) => {
        if (record != null) {
          console.log('record', record)
          return (
            <img
              src={record}
              alt="Pic"
              width={70}
              height={70}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              className="borderRadius50"
            />
          )
        } else {
          return (
            <img
              src="/public/Image/Avatar_Null.png"
              alt="Pic"
              width={70}
              height={70}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              className="borderRadius50"
            />
          )
        }
      }
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'fullName',
      key: 3,
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập tên"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }}
            onPressEnter={() => {
              confirm()
            }}
            onBlur={() => {
              confirm()
            }}
          ></Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        if (record.fullName != null) {
          return record.fullName.toLowerCase().includes(value.toLowerCase())
        }
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 4,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập email"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }}
            onPressEnter={() => {
              confirm()
            }}
            onBlur={() => {
              confirm()
            }}
          ></Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.email.toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 1,
      fixed: 'left'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 1,
      fixed: 'left'
    },
    {
      title: '',
      key: 1,
      fixed: 'left',
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => navigate(`${record.accountId}`)}
              type="primary"
              icon={<EditOutlined />}
            ></Button>{' '}
            &nbsp;
            {record.status == 'Đang hoạt động' ? (
              <Button
                onClick={() => handleOpenModalBan(record)}
                style={{ color: 'white', backgroundColor: 'red' }}
                icon={<PoweroffOutlined />}
              ></Button>
            ) : (
              <></>
            )}
            {record.status == 'Đang khóa' ? (
              <Button
                onClick={() => handleOpenModalUnBan(record)}
                style={{ color: 'white', backgroundColor: 'green' }}
                icon={<PoweroffOutlined />}
              ></Button>
            ) : (
              <></>
            )}
          </>
        )
      }
    }
  ]
  const handleOpenModalBan = (record) => {
    setModalBan(true)
    dispatch(openModal(record))
  }
  const handleOpenModalUnBan = (record) => {
    setModalBan(false)
    dispatch(openModal(record))
  }
  return (
    <div className="pt-10 px-6 bg-gray-200">
      <p className="text-center text-2xl font-semibold">Danh sách người dùng</p>
      {isSuccess ? (
        <div className="pt-10">
          <Table
            columns={columns}
            dataSource={data.userList}
            pagination={pagination}
          />
        </div>
      ) : (
        <div>Có lỗi xảy ra xin hãy truy cập lại</div>
      )}
      {modalBan ? <ModalBanAccount /> : <ModalUnbanAccount />}
    </div>
  )
}

export default UserAdminScreen
