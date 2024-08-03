import React, { useState } from 'react'
import {
  DatePicker,
  Dropdown,
  Breadcrumb,
  Layout,
  Table,
  Input,
  Modal,
  Form,
  notification,
  Button,
  theme,
  Card,
  Timeline,
  Tooltip,
  Select
} from 'antd'
import {
  SearchOutlined,
  CheckCircleOutlined,
  FolderOpenOutlined,
  EditOutlined,
  PoweroffOutlined,
  StopOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Topics } from '../../services/topics'
import { getSubject } from '../../../features/learning-self/services/getSubject'
import { ChangeStatusTopic } from '../../services/changeStatus'
import { UpdateTopic } from '../../services/updateTopic'
import {
  handleValidationCreateTopic,
  handleValidationUpdateTopic
} from '../../../utils/validate'
import ModalAddTopic from './ModalAddTopic'
import { BaseButton } from '../../../components/Button'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../redux/slice/ModalSlice'
import { AddTopic } from '../../services/addTopic'

const TopicAdminScreen = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const dayFormat = 'YYYY-MM-DD HH:mm'
  const [dataSource, setDataSource] = useState('')
  const [showEditForm, setShowEditForm] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const [createData, setCreateData] = useState({
    createSubjectId: 'Chọn môn học',
    createTopicType: 'Chọn loại topic',
    createGrade: 'Chọn lớp',
    createTopicName: '',
    createDuration: 'Chọn thời gian',
    createStartDate: '',
    createEndDate: ''
  })

  const [editData, setEditData] = useState({
    editSubjectId: '',
    editTopicType: '',
    editGrade: '',
    editTopicName: '',
    editDuration: '',
    editStartDate: '',
    editEndDate: ''
  })

  const [errors, setErrors] = useState({
    createSubjectId: '',
    createTopicType: '',
    createGrade: '',
    createTopicName: '',
    createDuration: '',
    createStartDate: '',
    createEndDate: '',
    editSubjectId: '',
    editTopicType: '',
    editGrade: '',
    editTopicName: '',
    editDuration: '',
    editStartDate: '',
    editEndDate: ''
  })

  const [api, contextHolder] = notification.useNotification()

  const openNotificationUpdate200 = (placement) => {
    api.success({
      message: `Thông báo`,
      description: 'Chỉnh sửa thành công',
      placement
    })
  }
  const openNotificationUpdate400 = (placement) => {
    api.error({
      message: `Thông báo`,
      description: 'Chỉnh sửa thất bại',
      placement
    })
  }
  const openNotificationChangeStatus200 = (placement) => {
    api.success({
      message: `Thông báo`,
      description: 'Thay đổi trạng thái thành công',
      placement
    })
  }
  const openNotificationChangeStatus400 = (placement) => {
    api.error({
      message: `Thông báo`,
      description: 'Thay đổi trạng thái thất bại',
      placement
    })
  }
  const openNotificationCreate200 = (placement) => {
    api.success({
      message: `Thông báo`,
      description: 'Thêm topic thành công',
      placement
    })
  }
  const openNotificationCreate400 = (placement) => {
    api.error({
      message: `Thông báo`,
      description: 'Thêm topic thất bại',
      placement
    })
  }

  const { data: topics, isSuccess: topicsIsSuccess } = useQuery({
    queryKey: ['topics'],
    queryFn: Topics
  })
  const { data: subjects, isSuccess: subjectIsSuccess } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubject
  })
  console.log('subjects', subjects)

  const handleChangeStatusClose = async (record) => {
    Modal.confirm({
      title: 'Bạn muốn khóa topic này',
      okText: 'Khóa',
      cancelText: 'Thoát',
      okType: 'danger',
      onOk: async () => {
        const status = '2'
        try {
          const result = await ChangeStatusTopic(record.topicId, status)
          if (result.status === 200) {
            openNotificationChangeStatus200('topRight')
            queryClient.invalidateQueries()
          } else {
            openNotificationChangeStatus400('topRight')
          }
        } catch {
          openNotificationChangeStatus400('topRight')
        }
      },
      cancelText: 'Cancel',
      onCancel: () => {}
    })
  }

  const handleChangeStatusOpen = async (record) => {
    Modal.confirm({
      title: 'Bạn muốn mở khóa topic này',
      okText: 'Mở',
      cancelText: 'Thoát',
      okType: 'default',
      onOk: async () => {
        const status = '1'
        try {
          const result = await ChangeStatusTopic(record.topicId, status)
          if (result.status === 200) {
            openNotificationChangeStatus200('topRight')
            queryClient.invalidateQueries()
          } else {
            openNotificationChangeStatus400('topRight')
          }
        } catch {
          openNotificationChangeStatus400('topRight')
        }
      },
      cancelText: 'Cancel',
      onCancel: () => {}
    })
  }

  const handleChangeStatusApprove = async (record) => {
    Modal.confirm({
      title: 'Bạn muốn duyệt topic này',
      okText: 'Duyệt',
      cancelText: 'Thoát',
      okType: 'default',
      onOk: async () => {
        const status = '1'
        try {
          const result = await ChangeStatusTopic(record.topicId, status)
          if (result.status === 200) {
            openNotificationChangeStatus200('topRight')
            queryClient.invalidateQueries()
          } else {
            openNotificationChangeStatus400('topRight')
          }
        } catch {}
      },
      cancelText: 'Cancel',
      onCancel: () => {}
    })
  }

  const handleCreateInputChange = (event) => {
    const field = event.target.name
    const value = event.target.value

    setCreateData((createData) => ({ ...createData, [field]: value }))
  }

  const handleEditInputChange = (event) => {
    const field = event.target.name
    const value = event.target.value

    setEditData((editData) => ({ ...editData, [field]: value }))
  }

  const onEditInputStartDateAndEndDate = (value, dateString) => {
    setEditData((editData) => ({ ...editData, editStartDate: dateString[0] }))
    setEditData((editData) => ({ ...editData, editEndDate: dateString[1] }))
  }

  const onCreateInputStartDateAndEndDate = (value, dateString) => {
    // const firstSelectedTime = dateString[0];
    setCreateData((createData) => ({
      ...createData,
      createStartDate: dateString[0]
    }))
    setCreateData((createData) => ({
      ...createData,
      createEndDate: dateString[1]
    }))
  }

  function convertToUTCDate(inputTimeString) {
    const originalDate = new Date(inputTimeString)
    return originalDate
  }

  const handleSubmitCreate = async () => {
    let errors = {}
    handleValidationCreateTopic(createData, errors)
    if (Object.keys(errors).length === 0) {
      const data = {
        topicName: createData.createTopicName,
        duration:
          createData.createDuration != 'Chọn thời gian'
            ? createData.createDuration
            : null,
        subjectId: createData.createSubjectId,
        topicType: createData.createTopicType,
        grade:
          createData.createGrade != 'Chọn lớp' ? createData.createGrade : null,
        startTestDate:
          convertToUTCDate(createData.createStartDate) != null
            ? convertToUTCDate(createData.createStartDate)
            : null,
        finishTestDate:
          convertToUTCDate(createData.createEndDate) != null
            ? convertToUTCDate(createData.createEndDate)
            : null
      }
      const result = await AddTopic(data)
      if (result.status === 200) {
        openNotificationCreate200('topRight')
        setErrors([])
        setShowCreateForm(false)
        setCreateData('')
        queryClient.invalidateQueries()
      } else {
        openNotificationCreate400('topRight')
      }
    } else {
      setErrors(errors)
    }
  }

  const onClickCancelCreateForm = () => {
    setShowCreateForm(false)
    setErrors([])
    setCreateData({
      createSubjectId: 'Chọn môn học',
      createTopicType: 'Chọn loại topic',
      createGrade: 'Chọn lớp',
      createTopicName: '',
      createDuration: 'Chọn thời gian'
    })
  }

  const handleViewEdit = (record) => {
    setEditData({
      editTopicId: record.topicId,
      editSubjectId: record.subjectId,
      editTopicType: record.topicType,
      editGrade: record.grade,
      editTopicName: record.topicName,
      editDuration: record.duration,
      editStartDate: record.beginTestDate,
      editEndDate: record.endTestDate
    })
    setShowEditForm(true)
  }

  const onClickCancelEditForm = () => {
    console.log(editData)
    setShowEditForm(false)
    setErrors([])
    setEditData({
      editTopicId: '',
      editSubjectId: '',
      editTopicType: '',
      editGrade: '',
      editTopicName: '',
      editDuration: '',
      editStartDate: '',
      editEndDate: ''
    })
  }

  const handleSubmitEdit = async () => {
    let errors = {}
    handleValidationUpdateTopic(editData, errors)
    if (Object.keys(errors).length === 0) {
      console.log(editData)
      const data = {
        topicId: editData.editTopicId,
        topicName: editData.editTopicName,
        duration:
          editData.editDuration != 'Chọn thời gian'
            ? editData.editDuration
            : null,
        subjectId: editData.editSubjectId,
        topicType: editData.editTopicType,
        grade: editData.editGrade != null ? editData.editGrade : null,
        startTestDate:
          convertToUTCDate(editData.editStartDate) != null
            ? convertToUTCDate(editData.editStartDate)
            : null,
        finishTestDate:
          convertToUTCDate(editData.editEndDate) != null
            ? convertToUTCDate(editData.editEndDate)
            : null
      }
      const result = await UpdateTopic(data)
      if (result.status === 200) {
        openNotificationUpdate200('topRight')
        setErrors([])
        setShowEditForm(false)
        setEditData('')
        queryClient.invalidateQueries()
      } else {
        openNotificationChangeStatus400('topRight')
      }
    } else {
      setErrors(errors)
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'topicId',
      key: 1,
      fixed: 'left'
    },
    {
      title: 'Môn học',
      dataIndex: 'subjectName',
      key: 2,
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập môn học"
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
        if (record.subjectName != null) {
          return record.subjectName.toLowerCase().includes(value.toLowerCase())
        }
      }
    },
    {
      title: 'Tên topic',
      dataIndex: 'topicName',
      key: 3,
      width: 600,
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập tên đề"
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
        if (record.topicName != null) {
          return record.topicName.toLowerCase().includes(value.toLowerCase())
        }
      }
    },
    {
      title: 'Thời lượng',
      dataIndex: 'duration',
      key: 4,
      fixed: 'left'
    },
    {
      title: 'Tổng câu hỏi',
      dataIndex: 'totalQuestion',
      key: 4,
      fixed: 'left'
    },
    {
      title: 'Lớp',
      dataIndex: 'grade',
      key: 5,
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập lớp"
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
        if (record.grade != null) {
          const gradeNumber = Number(record.grade)
          return !isNaN(gradeNumber) && gradeNumber === Number(value)
        }
      }
    },
    {
      title: 'Loại Topic',
      dataIndex: 'topicTypeName',
      key: 6,
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập loại topic"
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
          />
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        if (record.topicTypeName != null) {
          return record.topicTypeName
            .toLowerCase()
            .includes(value.toLowerCase())
        }
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 7,
      fixed: 'left'
    },
    {
      title: 'Điều hướng',
      key: 8,
      fixed: 'left',
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => handleViewEdit(record)}
              type="primary"
              icon={<EditOutlined />}
            ></Button>{' '}
            &nbsp;
            {record.status == 'Đã duyệt' && (
              <Button
                onClick={() => handleChangeStatusClose(record)}
                style={{ color: 'white', backgroundColor: 'red' }}
                icon={<StopOutlined />}
              ></Button>
            )}
            {record.status == 'Chờ duyệt' && (
              <Button
                onClick={() => handleChangeStatusApprove(record)}
                style={{ color: 'white', backgroundColor: 'grey' }}
                icon={<PlusCircleOutlined />}
              ></Button>
            )}
            {record.status == 'Khóa' && (
              <Button
                onClick={() => handleChangeStatusOpen(record)}
                style={{ color: 'white', backgroundColor: 'green' }}
                icon={<CheckCircleOutlined />}
              ></Button>
            )}
            &nbsp;
            <Button
              icon={<FolderOpenOutlined />}
              style={{ background: '#ffa000', color: 'white' }}
              onClick={() => handleViewListQuestion(record)}
            ></Button>
          </>
        )
      }
    }
  ]

  return (
    <div className="pt-10 px-6 bg-gray-200">
      {contextHolder}
      <p className="text-center text-2xl font-semibold">Danh sách Topics</p>
      <div>
        <BaseButton
          handleClick={() => setShowCreateForm(true)}
          title="Thêm Topic"
          className="px-6"
        />
      </div>
      {topicsIsSuccess ? (
        <div className="pt-10">
          <Table columns={columns} dataSource={topics.data} />
          {/* create */}

          <Modal
            title="Thêm mới topic"
            open={showCreateForm}
            okText="Thêm mới"
            cancelText="Đóng"
            onCancel={() => onClickCancelCreateForm()}
            onOk={() => handleSubmitCreate()}
          >
            <Form>
              <Form.Item>
                <label>Môn học</label>
                <select
                  name="createSubjectId"
                  value={createData.createSubjectId}
                  className="flex w-full py-3 mt-4"
                  onChange={handleCreateInputChange}
                >
                  <option value="Chọn môn học">Chọn môn học</option>
                  {subjectIsSuccess &&
                    subjects.data.map((item) => (
                      <option value={item.subjectId}>{item.subjectName}</option>
                    ))}
                </select>
                {errors.createSubjectId && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.createSubjectId}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <label>Loại Topic</label>
                <select
                  name="createTopicType"
                  value={createData.createTopicType}
                  className="flex w-full py-3 mt-4"
                  onChange={handleCreateInputChange}
                >
                  <option value="Chọn loại topic">Chọn loại topic</option>
                  <option value="1">Học</option>
                  <option value="2">Thi 15p</option>
                  <option value="3">Thi 1 tiết</option>
                  <option value="4">Thi học kì</option>
                  <option value="5">Thi THPT Quốc gia</option>
                  <option value="6">Cuộc thi chung</option>
                </select>
                {errors.createTopicType && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.createTopicType}
                  </div>
                )}
              </Form.Item>
              {createData.createTopicType != 5 &&
                createData.createTopicType != 6 && (
                  <Form.Item>
                    <label>Lớp</label>
                    <select
                      name="createGrade"
                      value={createData.createGrade}
                      className="flex w-full py-3 mt-4"
                      onChange={handleCreateInputChange}
                    >
                      <option value="Chọn lớp">Chọn lớp</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    {errors.createGrade && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block', color: 'red' }}
                      >
                        {errors.createGrade}
                      </div>
                    )}
                  </Form.Item>
                )}
              <Form.Item>
                <label>Tên Topic</label>
                <Input
                  type="text"
                  placeholder="Nhập tên topic"
                  className="flex w-full py-3 mt-4"
                  value={createData.createTopicName}
                  name="createTopicName"
                  onChange={handleCreateInputChange}
                />
                {errors.createTopicName && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.createTopicName}
                  </div>
                )}
              </Form.Item>
              {createData.createTopicType != '1' &&
                createData.createTopicType != 'Chọn loại topic' && (
                  <Form.Item>
                    <label>Thời gian làm bài</label>
                    <select
                      name="createDuration"
                      value={createData.createDuration}
                      className="form-control"
                      onChange={handleCreateInputChange}
                    >
                      <option value="Chọn thời gian">Chọn thời gian </option>
                      <option value="15">15p</option>
                      <option value="45">45p</option>
                      <option value="60">60p</option>
                      <option value="120">120p</option>
                    </select>
                    {errors.createDuration && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block', color: 'red' }}
                      >
                        {errors.createDuration}
                      </div>
                    )}
                  </Form.Item>
                )}
              {createData.createTopicType == 6 && (
                <Form.Item>
                  <label>Thời gian bắt đầu và kết thúc</label>
                  <RangePicker
                    showTime={{
                      format: 'HH:mm'
                    }}
                    placeholder=""
                    format="YYYY-MM-DD HH:mm"
                    onChange={onCreateInputStartDateAndEndDate}
                  />
                  {errors.createStartDate && (
                    <div
                      className="invalid-feedback"
                      style={{ display: 'block', color: 'red' }}
                    >
                      {errors.createStartDate}
                    </div>
                  )}
                </Form.Item>
              )}
            </Form>
          </Modal>

          {/* edit */}
          <Modal
            title="Chỉnh sửa topic"
            open={showEditForm}
            okText="Lưu"
            cancelText="Đóng"
            onCancel={() => onClickCancelEditForm()}
            onOk={() => handleSubmitEdit()}
          >
            <Form>
              <Form.Item>
                <label>Môn học</label>
                <select
                  name="editSubjectId"
                  value={editData.editSubjectId}
                  className="flex w-full py-3 mt-4"
                  onChange={handleEditInputChange}
                >
                  <option value="Chọn môn học">Chọn môn học</option>
                  {subjectIsSuccess &&
                    subjects.data.map((item) => (
                      <option value={item.subjectId}>{item.subjectName}</option>
                    ))}
                </select>
                {errors.editSubjectId && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.editSubjectId}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <label>Loại Topic</label>
                <select
                  name="editTopicType"
                  value={editData.editTopicType}
                  className="flex w-full py-3 mt-4"
                  onChange={handleEditInputChange}
                >
                  <option value="Chọn loại topic">Chọn loại topic</option>
                  <option value="1">Học</option>
                  <option value="2">Thi 15p</option>
                  <option value="3">Thi 1 tiết</option>
                  <option value="4">Thi học kì</option>
                  <option value="5">Thi THPT Quốc gia</option>
                  <option value="6">Cuộc thi chung</option>
                </select>
                {errors.editTopicType && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.editTopicType}
                  </div>
                )}
              </Form.Item>
              {editData.editTopicType != 5 && editData.editTopicType != 6 && (
                <Form.Item>
                  <label>Lớp</label>
                  <select
                    name="editGrade"
                    value={editData.editGrade}
                    className="flex w-full py-3 mt-4"
                    onChange={handleEditInputChange}
                  >
                    <option value="Chọn lớp">Chọn lớp</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  {errors.editGrade && (
                    <div
                      className="invalid-feedback"
                      style={{ display: 'block', color: 'red' }}
                    >
                      {errors.editGrade}
                    </div>
                  )}
                </Form.Item>
              )}
              <Form.Item>
                <label>Tên Topic</label>
                <Input
                  type="text"
                  placeholder="Nhập tên topic"
                  className="flex w-full py-3 mt-4"
                  value={editData.editTopicName}
                  name="editTopicName"
                  onChange={handleEditInputChange}
                />
                {errors.editTopicName && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.editTopicName}
                  </div>
                )}
              </Form.Item>
              {editData.editTopicType != '1' &&
                editData.editTopicType != 'Chọn loại topic' && (
                  <Form.Item>
                    <label>Thời gian làm bài</label>
                    <select
                      name="editDuration"
                      value={editData.editDuration}
                      className="form-control"
                      onChange={handleEditInputChange}
                    >
                      <option value="Chọn lớp">Chọn thời gian </option>
                      <option value="15">15p</option>
                      <option value="45">45p</option>
                      <option value="60">60p</option>
                      <option value="120">120p</option>
                    </select>
                    {errors.editDuration && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block', color: 'red' }}
                      >
                        {errors.editDuration}
                      </div>
                    )}
                  </Form.Item>
                )}
              {editData.editTopicType == '6' && (
                <Form.Item>
                  <div className="row">
                    <Form.Item>
                      <label>Thời gian bắt đầu và kết thúc</label>
                      <RangePicker
                        showTime={{
                          format: 'HH:mm'
                        }}
                        placeholder=""
                        format="YYYY-MM-DD HH:mm"
                        value={
                          editData.editStartDate && editData.editEndDate
                            ? [
                                dayjs(editData.editStartDate, dayFormat),
                                dayjs(editData.editEndDate, dayFormat)
                              ]
                            : [null, null]
                        }
                        onChange={onEditInputStartDateAndEndDate}
                      />
                      {errors.editStartDate && (
                        <div
                          className="invalid-feedback"
                          style={{ display: 'block', color: 'red' }}
                        >
                          {errors.editStartDate}
                        </div>
                      )}
                    </Form.Item>
                  </div>
                </Form.Item>
              )}
            </Form>
          </Modal>
        </div>
      ) : (
        <div>Có lỗi xảy ra xin hãy truy cập lại</div>
      )}
    </div>
  )
}

export default TopicAdminScreen
