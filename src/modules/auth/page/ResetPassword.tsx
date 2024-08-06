import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import {
  resetPassword,
  useResetPasswordMutation,
} from '../api/authApiEndpoint';
import { webRoutes } from '../../../route/RouteLinks';
import errorHandler from '../../common/errorHandler';

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();
  const navigate = useNavigate();

  const onFinish = async (values: { password: string }) => {
    const body: resetPassword = {
      token: token,
      password: values?.password,
    };
    await resetPassword(body);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Password changed successfully');
      navigate(`${webRoutes?.login}`);
    } else if (isError) {
      if (error) {
        errorHandler(error);
      }
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <h1 className='welcome text-center text-2xl'>Provide New Password</h1>
      <Form onFinish={onFinish} className='z-10'>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Please input your new password!' },
          ]}
        >
          <Input.Password className='p-2' placeholder='New Password' />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password className='p-2' placeholder='Confirm New Password' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' loading={isLoading} htmlType='submit'>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
