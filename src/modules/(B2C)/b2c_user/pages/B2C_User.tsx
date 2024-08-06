import React, { useEffect, useState } from 'react';
import BasePageContainer from '../../../../app_components/PageContainer';
import {
  BreadcrumbProps,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Table,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { B2CRoutes, webRoutes } from '../../../../route/RouteLinks';
import b2cUserColumn from '../utils/b2cUserColumn';
import {
  useGetSingleUserQuery,
  useLazyGetUserListQuery,
  useUpdateUserMutation,
} from '../api/b2cuserEndpoints';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib';
import { imgHostLink } from '../../../../redux/request';
import { IB2CUserListType } from '../type/b2cUserTypes';
import SearchTableInfo from '../../../common/SearchTableInfo';
import { size_limit } from '../../../../constants/Pagination';

type Props = {};
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: B2CRoutes.user,
      title: <Link to={''}>User</Link>,
    },
  ],
};
const B2C_User = (props: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const formData = new FormData();
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState<{
    moalOpen: boolean;
    id: number;
  }>({ moalOpen: false, id: 0 });

  const { data: singleUser } = useGetSingleUserQuery(isModalOpen.id);
  const [
    upateUser,
    { data: updateUser, isSuccess: updateSuccess, isError: updateError },
  ] = useUpdateUserMutation();
  const handleOk = () => {
    setIsModalOpen({ ...isModalOpen, moalOpen: false });
  };

  const handleCancel = () => {
    setIsModalOpen({ ...isModalOpen, moalOpen: false });
  };

  const onFinish = (values: IB2CUserListType) => {
    const { photo, ...allData } = values;
    for (const key in allData) {
      if (allData[key] !== undefined && allData[key] !== '') {
        formData.append(key, allData[key]);
      }
    }
    if (photo !== undefined && photo?.fileList[0]?.originFileObj) {
      formData.append('photo', photo.fileList[0].originFileObj);
    }

    upateUser({ id: isModalOpen.id, body: formData });
  };
  useEffect(() => {
    if (updateSuccess) {
      message.success('User updated successfully');
      setIsModalOpen({ ...isModalOpen, moalOpen: false });
    } else if (updateError) {
      message.error('something went wrong');
    }
  }, [updateSuccess, updateError]);
  useEffect(() => {
    if (singleUser?.data) {
      form.setFieldsValue({
        name: singleUser.data.name,
        mobile_number: singleUser.data.mobile_number,
        status: singleUser.data.status,
        email: singleUser.data.email,
        is_verified: singleUser.data.is_verified,
      });
    }
    if (singleUser?.data?.photo) {
      setFileList([
        {
          uid: '1',
          name: 'image.png',
          status: 'done',
          url: imgHostLink + '/' + singleUser?.data?.photo,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [singleUser?.data]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  // Pagination Config and Dummy Data Paginate
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  const handlePaginationChange = (current: number, pageSize: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current,
      pageSize,
    }));
    window.scrollTo(0, 0);
  };
  const [getUserList, { data }] = useLazyGetUserListQuery();
  const [status, setStatus] = useState<any>(1);
  const [input, setInputSearch] = useState<any>();

  /* search and filter */
  useEffect(() => {
    getUserList(
      `/btob/btoc-user?skip=${(pagination.current - 1) * size_limit}&limit=${
        pagination.pageSize
      }`
    );
  }, [pagination]);
  useEffect(() => {
    status
      ? getUserList(`/btob/btoc-user?status=${status}`)
      : getUserList(`/btob/btoc-user`);
  }, [status]);
  useEffect(() => {
    if (input?.indexOf('@') !== -1) {
      input
        ? getUserList(`/btob/btoc-user?email=${input}`)
        : getUserList(`/btob/btoc-user`);
    } else {
      input
        ? getUserList(`/btob/btoc-user?name=${input}`)
        : getUserList(`/btob/btoc-user`);
    }
  }, [input]);

  const selectSearchs = (value: string) => {
    setStatus(value);
  };
  const selectSearchon = (value: string) => {
    setInputSearch(value);
  };

  console.log(pagination);
  return (
    <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
      <SearchTableInfo
        selectStatusFilter={selectSearchs}
        inputSearchChange={selectSearchon}
        options={[
          { value: '1', label: 'Active' },
          { value: '0', label: 'InActive' },
        ]}
      />
      <Table
        size='small'
        bordered
        columns={b2cUserColumn({ setIsModalOpen, pagination })}
        dataSource={data?.data}
        pagination={
          data?.total !== undefined && data?.total < 20
            ? false
            : {
                ...pagination,
                total: data?.total,
                showSizeChanger: true,
                pageSizeOptions: ['20', '50', '100'],
                onChange: handlePaginationChange,
              }
        }
      />

      <Modal
        title='Edit User'
        open={isModalOpen.moalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        forceRender
      >
        <Form
          name='basic'
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
          form={form}
        >
          <Row justify={'center'}>
            <Form.Item name='photo'>
              <Upload
                action={imgHostLink}
                listType='picture-card'
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
              >
                {fileList.length < 1 && (
                  <div className='flex flex-col justify-center items-center'>
                    <PlusOutlined /> <span>Edit Image</span>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Row>
          <Row gutter={[10, 0]}>
            <Col lg={12}>
              <Form.Item
                label='Username'
                name='name'
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                label='Phone Number'
                name='mobile_number'
                rules={[
                  { required: true, message: 'Please input your phoneNumber!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item colon={true} label='Status' name={'status'}>
                <Radio.Group>
                  <Radio value={0}> InActive </Radio>
                  <Radio value={1}> Active </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </BasePageContainer>
  );
};

export default B2C_User;
