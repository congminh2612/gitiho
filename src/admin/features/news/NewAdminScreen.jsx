import React from 'react'
import { DatePicker, Dropdown, Breadcrumb, Layout, Table, Input, Modal, Form, notification, Button, theme, Card, Timeline, Tooltip, Select } from 'antd';
import {
  SearchOutlined, CheckCircleOutlined,
  EditOutlined, MinusCircleOutlined
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { BaseButton } from '../../../components/Button';
import { news } from '../../../features/news/services/news';

const NewAdminScreen = () => {
  const { data, isSuccess } = useQuery({ queryKey: ['news'], queryFn: news })
  const columns = [
    {
      title: "ID",
      dataIndex: "newsId",
      key: 1,
      fixed: "left",
    },
    {
      title: "Ảnh bìa",
      dataIndex: "image",
      key: "image",
      fixed: "left",
      render: (record) => {
        if (record != null) {
          return (
            <img
              src={record}
              alt="Pic"
              width={70}
              height={70}
              style={{ objectFit: "cover" }}
              className="borderRadius50"
            />
          );
        } else {
          return (
            <img
              src="../Image/Image_Null.png"
              alt="Pic"
              width={70}
              height={70}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              className="borderRadius50"
            />
          );
        }
      },
    },
    {
      title: "Loại tin tức",
      dataIndex: "categoryName",
      key: "categoryName",
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập loại tin tức"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        if (record.categoryName != null) {
          return record.categoryName.toLowerCase().includes(value.toLowerCase());
        }
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập tiêu đề"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        if (record.title != null) {
          return record.title.toLowerCase().includes(value.toLowerCase());
        }
      },
    },
    {
      title: "Người tạo",
      dataIndex: "accountName",
      key: "accountName",
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập tên người tạo"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        if (record.accountName != null) {
          return record.accountName.toLowerCase().includes(value.toLowerCase());
        }
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: 1,
      fixed: "left",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: 1,
      fixed: "left",
      render: (record) => {
        if (record == "0") {
          return "Chờ duyệt";
        } else if (record == "1") {
          return "Đã duyệt";
        } else {
          return "";
        }
      },
    },
    {
      title: "Điều hướng",
      key: 1,
      fixed: "center",
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => handleViewEdit(record)}
              type="primary"
              icon={<EditOutlined />}
            ></Button>{" "}
            &nbsp;
            {record.status == "1" ? (
              <Button
                onClick={() => handleChangeStatusDeActivate(record)}
                style={{ color: "white", backgroundColor: "red" }}
                icon={<MinusCircleOutlined />}
              ></Button>
            ) : (
              <></>
            )}
            {record.status == "0" ? (
              <Button
                onClick={() => handleChangeStatusActivate(record)}
                style={{ color: "white", backgroundColor: "green" }}
                icon={<CheckCircleOutlined />}
              ></Button>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
  ]
  return (
    <div className="pt-10 px-6 bg-gray-200">
      <p className="text-center text-2xl font-semibold">Danh sách tin tức</p>
      <BaseButton
        title="Thêm tin tức"
        className="px-6 py-[8px]"
      />

      {isSuccess ? (
        <div className="pt-10">
          <Table
            columns={columns}
            dataSource={data.data}
          />
        </div>
      ) : (
        <div>Có lỗi xảy ra xin hãy truy cập lại</div>
      )}
    </div>
  )
}

export default NewAdminScreen
