import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  Select,
  message,
  Row,
  Col,
  Alert,
} from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImageInputs from '../../common/UploadImageInputs';
import { useCreateMyAgencyMutation } from '../api/agencyApiEndpoint';
import { useNavigate } from 'react-router-dom';

const CreateMyAgency = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createMyAgency, { isSuccess, isError, error, isLoading }] =
    useCreateMyAgencyMutation();
  const onFinish = async (values: any) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.delete('agency_logo');
    if (values.agency_logo) {
      formData.append(
        'agency_logo',
        values.agency_logo.fileList[0]?.originFileObj
      );
    }
    formData.delete('user_photo');
    if (values.user_photo) {
      formData.append(
        'user_photo',
        values.user_photo.fileList[0]?.originFileObj
      );
    }

    await createMyAgency(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Sub Agency created successfully.');
      form.resetFields();
      navigate('/myAgency');
    } else if (isError) {
      if (error) {
        const apiError: any = error;
        message.error(apiError.data?.message);
      }
    }
  }, [isSuccess, isError]);

  return (
    <div className='bg-[#7a7a7a1a] p-10'>
      <h2 className='mb-5'>Create Agency</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        initialValues={{ phone: '+88' }}
      >
        <Row gutter={[15, 15]}>
          <Col lg={12}>
            <Alert
              type='info'
              message='Agency Info'
              showIcon
              className='mb-4'
            />

            <Form.Item
              label='Agency Name'
              name='agency_name'
              rules={[{ required: true, message: 'Please input Agency Name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Agency Email'
              name='agency_email'
              rules={[
                { required: true, message: 'Please input Agency Email!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Agency Phone'
              name='agency_phone'
              rules={[
                { required: true, message: 'Please input Agency Phone!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Commission'
              name='commission'
              rules={[
                {
                  required: true,
                  message: 'Please input Commission!',
                },
                {
                  pattern: /^(0*(?:\d\.\d{1,2}|[1-9]\d{0,1}(?:\.\d{1,2})?))%?$/,
                  message:
                    'Please enter a valid commission between 0.1% and 99.99%',
                },
              ]}
            >
              <Input type='number' />
            </Form.Item>

            <UploadImageInputs
              name='agency_logo'
              label='Agency Logo'
              uploadButtonText='Upload Agency Logo'
              required={true}
            />
          </Col>
          <Col lg={12}>
            <Alert type='info' message='User Info' showIcon className='mb-4' />
            <Form.Item
              label='User Name'
              name='user_name'
              rules={[{ required: true, message: 'Please input User Name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='User Email'
              name='user_email'
              rules={[{ required: true, message: 'Please input User Email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='User Password'
              name='user_password'
              rules={[
                { required: true, message: 'Please input User Password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label='User Phone'
              name='user_phone'
              rules={[
                { required: true, message: 'Please input User Phone number!' },
              ]}
            >
              <Input />
            </Form.Item>
            <UploadImageInputs
              name='user_photo'
              label='User Photo'
              uploadButtonText='Upload User Photo'
            />
          </Col>
        </Row>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='w-full'
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateMyAgency;
