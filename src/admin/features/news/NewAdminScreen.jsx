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
  EditOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import { ref, uploadBytes, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import { storage } from "../../../config/firebase.config";
import { v4 } from "uuid";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { BaseButton } from '../../../components/Button'
import { news } from '../../../features/news/services/news'
import { AddNews, EditNewsService, GetAllNewsCategory } from '../../services/new';
import { handleValidationCreateNew, handleValidationEditNew } from '../../../utils/validate';
import { useSelector } from 'react-redux';

const NewAdminScreen = () => {
  const queryClient = useQueryClient()
  const account = useSelector(state => state.auth.currentUser?.account)
  const { data: newData, isSuccess: newIsSuccess } = useQuery({ queryKey: ['news'], queryFn: news })
  const { data: newCategory, isSuccess: categoryIsSuccess } = useQuery({ queryKey: ['categories'], queryFn: GetAllNewsCategory })
  const columns = [
    {
      title: 'ID',
      dataIndex: 'newsId',
      key: 1,
      fixed: 'left'
    },
    {
      title: 'Ảnh bìa',
      dataIndex: 'image',
      key: 'image',
      fixed: 'left',
      render: (record) => {
        if (record != null) {
          return (
            <img
              src={record}
              alt="Pic"
              width={70}
              height={70}
              style={{ objectFit: 'cover' }}
              className="borderRadius50"
            />
          )
        } else {
          return (
            <img
              src="../Image/Image_Null.png"
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
      title: 'Loại tin tức',
      dataIndex: 'categoryName',
      key: 'categoryName',
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập loại tin tức"
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
        if (record.categoryName != null) {
          return record.categoryName.toLowerCase().includes(value.toLowerCase())
        }
      }
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập tiêu đề"
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
        if (record.title != null) {
          return record.title.toLowerCase().includes(value.toLowerCase())
        }
      }
    },
    {
      title: 'Người tạo',
      dataIndex: 'accountName',
      key: 'accountName',
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập tên người tạo"
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
        if (record.accountName != null) {
          return record.accountName.toLowerCase().includes(value.toLowerCase())
        }
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createDate',
      key: 1,
      fixed: 'left'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 1,
      fixed: 'left',
      render: (record) => {
        if (record == '0') {
          return 'Chờ duyệt'
        } else if (record == '1') {
          return 'Đã duyệt'
        } else {
          return ''
        }
      }
    },
    {
      title: 'Điều hướng',
      key: 1,
      fixed: 'center',
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => handleViewEdit(record)}
              type="primary"
              icon={<EditOutlined />}
            ></Button>{' '}
            &nbsp;
            {record.status == '1' ? (
              <Button
                onClick={() => handleChangeStatusDeActivate(record)}
                style={{ color: 'white', backgroundColor: 'red' }}
                icon={<MinusCircleOutlined />}
              ></Button>
            ) : (
              <></>
            )}
            {record.status == '0' ? (
              <Button
                onClick={() => handleChangeStatusActivate(record)}
                style={{ color: 'white', backgroundColor: 'green' }}
                icon={<CheckCircleOutlined />}
              ></Button>
            ) : (
              <></>
            )}
          </>
        )
      }
    }
  ]
  const [newList, setNewList] = useState([]);
  const [imageUpload, setImageUpload] = useState(null)
  const [newCategoryList, setNewCategoryList] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [createData, setCreateDate] = useState({
    createCategory: "Chọn loại",
    createImage: "",
    createTitle: "",
    createSubTitle: "",
    createContent: "",
  });

  const [editData, setEditData] = useState({
    editNewsId: "",
    editCategory: "",
    editImage: "",
    editTitle: "",
    editSubTitle: "",
    editContent: "",
  })

  const [errors, setErrors] = useState({
    createCategory: "",
    createImage: "",
    createTitle: "",
    createSubTitle: "",
    createContent: "",
    editCategory: "",
    editImage: "",
    editTitle: "",
    editSubTitle: "",
    editContent: "",
  })


  const [api, contextHolder] = notification.useNotification();
  const openNotificationSuccess = (placement) => {
    api.success({
      message: `Thông báo`,
      description: "Thêm thành công",
      placement,
    });
  };
  const openNotificationFail = (placement) => {
    api.error({
      message: `Thông báo`,
      description: "Thêm thất bại",
      placement,
    });
  };
  const openNotificationUpdateSuccess = (placement) => {
    api.success({
      message: `Thông báo`,
      description: "Chỉnh sửa thành công",
      placement,
    });
  };
  const openNotificationUpdateFail = (placement) => {
    api.error({
      message: `Thông báo`,
      description: "Chỉnh sửa thất bại",
      placement,
    });
  };





  const handleCreateInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setCreateDate((createData) => ({ ...createData, [field]: value }));
  }

  const handleEditInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setEditData((editData) => ({ ...editData, [field]: value }));
  }

  const handleCreateInputFile = async (event) => {
    if (event == null) {
      return;
    }
    const file = event.target.files[0];

    const imgRef = ref(storage, `images/news_images/${createData.createTitle + v4()}`);
    try {
      const snapshoot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshoot.ref);
      setImageUpload(url);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  }

  const handleAddNews = async () => {
    try {
      let errors = {};
      handleValidationCreateNew(createData, errors, imageUpload);
      if (Object.keys(errors).length === 0) {
        const data = {
          categoryName: createData.createCategory,
          title: createData.createTitle,
          image: imageUpload,
          subTitle: createData.createSubTitle,
          content: createData.createContent,
          accountId: account.accountId,
        }
        const result = await AddNews(data);
        if (result.status === 200) {
          queryClient.invalidateQueries()
          setCreateDate({
            createCategory: "",
            createImage: "",
            createTitle: "",
            createSubTitle: "",
            createContent: "",
          });
          setImageUpload(null);
          openNotificationSuccess('topRight');
          setShowCreateForm(false);

        } else {
          openNotificationFail('topRight')
        }
      } else {
        setErrors(errors);
      }
    } catch {
      openNotificationFail('topRight')
    }
  }

  const handleViewEdit = (record) => {
    setImageUpload(record.image);
    setEditData({
      editNewsId: record.newsId,
      editCategory: record.categoryName,
      editTitle: record.title,
      editSubTitle: record.subTitle,
      editImage: record.image,
      editContent: record.content,
    });
    setShowEditForm(true);
  }

  const handleEditNews = async () => {
    try {
      let errors = {}
      handleValidationEditNew(editData, errors, imageUpload);
      if (Object.keys(errors).length === 0) {
        const convertedContent = editData.editContent
          .replace(/"/g, "'")
          .replace(/&apos;/g, "'");
        const data = {
          newsId: editData.editNewsId,
          categoryName: editData.editCategory,
          title: editData.editTitle,
          image: imageUpload,
          subTitle: editData.editSubTitle,
          content: convertedContent,
        }
        const result = await EditNewsService(data);
        if (result.status === 200) {
          queryClient.invalidateQueries
          openNotificationUpdateSuccess('topRight');
          setShowEditForm(false)
        }
      } else {
        setErrors(errors);
      }
    } catch {
      console.log("errors");
    }

  }

  return (
    <div className="pt-10 px-6 bg-gray-200">
      {contextHolder}
      <p className="text-center text-2xl font-semibold">Danh sách tin tức</p>
      <BaseButton title="Thêm tin tức" className="px-6 py-[8px]"
        handleClick={() => {
          setShowCreateForm(true);
        }} />

      {newIsSuccess ? (
        <div className="pt-10">
          <Table columns={columns} dataSource={newData.data} />
          <Modal
            title='Tạo tin tức'
            visible={showCreateForm}
            okText='Thêm'
            cancelText='Đóng'
            onCancel={() => {
              setShowCreateForm(false);
              setErrors([]);
              setCreateDate('');
              setImageUpload(null);
            }}
            onOk={() => handleAddNews()}
          >
            <Form>
              <Form.Item>
                <label>Loại tin tức</label>
                <select
                  name="createCategory"
                  defaultValue="Chọn loại"
                  value={createData.createCategory}
                  allowClear
                  onChange={handleCreateInputChange}
                  className="flex w-full mt-3 py-2"
                >
                  <option
                    value="Chọn loại"
                  >
                    Chọn loại
                  </option>
                  {categoryIsSuccess && newCategory.data.map((item) => (
                    <option
                      value={item.categoryName}
                    >
                      {item.categoryName}
                    </option>
                  ))}
                </select>
                {errors.createCategory && (
                  <div
                    className='invalid-feedback'
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.createCategory}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <label className="w-100">Ảnh bìa</label>
                <div className="w-100">
                  {imageUpload == null || imageUpload == "" ? (
                    <img
                      src='../Image/Image_Null.png'
                      alt=''
                    />
                  ) : (
                    <>
                      {imageUpload && (
                        <img
                          src={imageUpload}
                          alt=''
                          className="w-100"
                          style={{ overflow: 'hidden', objectFit: 'cover' }}
                        />
                      )}
                    </>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handleCreateInputFile}
                />
                {errors.createImage && (
                  <div
                    className='invalid-feedback'
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.createImage}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <label>Tiêu đề</label>
                <Input
                  type='text'
                  placeholder='Nhập tên tiêu đề'
                  className='form-control'
                  value={createData.createTitle}
                  name='createTitle'
                  onChange={handleCreateInputChange}
                />
                {errors.createTitle && (
                  <div
                    className='invalid-feedback'
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.createTitle}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <label>Phụ đề</label>
                <Input
                  type='text'
                  placeholder='Nhập phụ đề'
                  className='form-control'
                  value={createData.createSubTitle}
                  name='createSubTitle'
                  onChange={handleCreateInputChange}
                />
                {errors.createSubTitle && (
                  <div
                    className='invalid-feedback'
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.createSubTitle}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <label>Nội dung</label>
                <ReactQuill className="quill-editor" value={createData?.createContent}
                  onChange={(value) => setCreateDate({ ...createData, createContent: value })}
                />
                {errors.createContent && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.createContent}
                  </div>
                )}
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title='Chỉnh sửa tin tức'
            visible={showEditForm}
            okText='Lưu'
            cancelText='Đóng'
            onCancel={() => {
              setShowEditForm(false);
              // setErrors([]);
              setEditData('');
            }}
            onOk={() => handleEditNews()}
          >
            <Form>
              <Form.Item>
                <label>Loại tin tức</label>
                <select
                  name="editCategory"
                  defaultValue="Chọn loại"
                  value={editData.editCategory}
                  allowClear
                  onChange={handleEditInputChange}
                  className="flex w-full py-2 mt-3"
                >
                  <option
                    value="Chọn loại"
                  >
                  </option>
                  {categoryIsSuccess && newCategory.data.map((item) => (
                    <option
                      value={item.categoryName}
                    >
                      {item.categoryName}
                    </option>
                  ))}
                </select>
                {errors.editCategory && (
                  <div
                    className='invalid-feedback'
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.editCategory}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <label className="w-100">Ảnh bìa</label>
                <div className="w-100">
                  {imageUpload == null || imageUpload == "" ? (
                    <img
                      src='../Image/Image_Null.png'
                      alt=''
                    />
                  ) : (
                    <>
                      {imageUpload && (
                        <img
                          src={imageUpload}
                          alt=''
                          className="w-100"
                          style={{ overflow: 'hidden', objectFit: 'cover' }}
                        />
                      )}
                    </>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handleCreateInputFile}
                />
              </Form.Item>
              <Form.Item>
                <label>Tiêu đề</label>
                <Input
                  type='text'
                  placeholder='Nhập tên tiêu đề'
                  className='form-control'
                  value={editData.editTitle}
                  name='editTitle'
                  onChange={handleEditInputChange}
                />
                {errors.editTitle && (
                  <div
                    className='invalid-feedback'
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.editTitle}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <label>Phụ đề</label>
                <Input
                  type='text'
                  placeholder='Nhập phụ đề'
                  className='form-control'
                  value={editData.editSubTitle}
                  name='editSubTitle'
                  onChange={handleEditInputChange}
                />
                {errors.editSubTitle && (
                  <div
                    className='invalid-feedback'
                    style={{ display: 'block', color: 'red' }}
                  >
                    {errors.editSubTitle}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <label>Nội dung</label>
                <ReactQuill className="quill-editor" value={editData?.editContent}
                  onChange={(value) => setEditData({ ...editData, editContent: value })}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      ) : (
        <div>Có lỗi xảy ra xin hãy truy cập lại</div>
      )}
    </div>
  )
}

export default NewAdminScreen
