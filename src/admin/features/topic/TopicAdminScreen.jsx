import React from 'react'
import { DatePicker, Dropdown, Breadcrumb, Layout, Table, Input, Modal, Form, notification, Button, theme, Card, Timeline, Tooltip, Select } from 'antd';
import {
  SearchOutlined, CheckCircleOutlined, FolderOpenOutlined,
  EditOutlined, PoweroffOutlined, StopOutlined, PlusCircleOutlined
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query';
import { Topics } from '../../services/topics';

const TopicAdminScreen = () => {
  const { data, isSuccess } = useQuery({ queryKey: ['topics'], queryFn: Topics })
  console.log(data)
  const columns = [
    {
      title: "ID",
      dataIndex: "topicId",
      key: 1,
      fixed: "left",
    },
    {
      title: "Môn học",
      dataIndex: "subjectName",
      key: 2,
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập môn học"
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
        if (record.subjectName != null) {
          return record.subjectName.toLowerCase().includes(value.toLowerCase());
        }
      },
    },
    {
      title: "Tên topic",
      dataIndex: "topicName",
      key: 3,
      width: 600,
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập tên đề"
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
        if (record.topicName != null) {
          return record.topicName.toLowerCase().includes(value.toLowerCase());
        }
      },
    },
    {
      title: "Thời lượng",
      dataIndex: "duration",
      key: 4,
      fixed: "left",
    },
    {
      title: "Tổng câu hỏi",
      dataIndex: "totalQuestion",
      key: 4,
      fixed: "left",
    },
    {
      title: "Lớp",
      dataIndex: "grade",
      key: 5,
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập lớp"
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
        if (record.grade != null) {
          const gradeNumber = Number(record.grade);
          return !isNaN(gradeNumber) && gradeNumber === Number(value);
        }
      },
    },
    {
      title: "Loại Topic",
      dataIndex: "topicTypeName",
      key: 6,
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập loại topic"
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
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        if (record.topicTypeName != null) {
          return record.topicTypeName.toLowerCase().includes(value.toLowerCase());
        }
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: 7,
      fixed: "left",
    },
    {
      title: "Điều hướng",
      key: 8,
      fixed: "left",
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => handleViewEdit(record)}
              type="primary"
              icon={<EditOutlined />}
            ></Button>{" "}
            &nbsp;
            {record.status == "Đã duyệt" && (
              <Button
                onClick={() => handleChangeStatusClose(record)}
                style={{ color: "white", backgroundColor: "red" }}
                icon={<StopOutlined />}
              ></Button>
            )}
            {record.status == "Chờ duyệt" && (
              <Button
                onClick={() => handleChangeStatusApprove(record)}
                style={{ color: "white", backgroundColor: "grey" }}
                icon={<PlusCircleOutlined />}
              ></Button>
            )}
            {record.status == "Khóa" && (
              <Button
                onClick={() => handleChangeStatusOpen(record)}
                style={{ color: "white", backgroundColor: "green" }}
                icon={<CheckCircleOutlined />}
              ></Button>
            )}
            &nbsp;
            <Button
              icon={<FolderOpenOutlined />}
              style={{ background: '#ffa000', color: 'white' }}
              onClick={() => handleViewListQuestion(record)}
            >
            </Button>
          </>
        );
      },
    },
  ]
  return (
    <div className='pt-10 px-6 bg-gray-200'>
      <p className='text-center text-2xl font-semibold'>Danh sách Topics</p>
      {isSuccess ? (
        <div className='pt-10'>
          <Table
            columns={columns}
            dataSource={data.data}
          />
        </div>
      ) :
        (
          <div>
            Có lỗi xảy ra xin hãy truy cập lại
          </div>
        )
      }

    </div>
  )
}

export default TopicAdminScreen
