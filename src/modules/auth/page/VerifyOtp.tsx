import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  SendOTP,
  matchOtp,
  useMatchOtpMutation,
  useSendOtpMutation,
} from '../api/authApiEndpoint';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import errorHandler from '../../common/errorHandler';
import { webRoutes } from '../../../route/RouteLinks';

const VerifyOtp = () => {
  const [matchOtp, { data, isLoading, isSuccess, isError, error }] =
    useMatchOtpMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');

  const navigate = useNavigate();

  const onFinish = async (values: { otp: string }) => {
    const body: matchOtp = {
      email: email!,
      otp: values?.otp,
      type: 'reset_btob',
    };
    const res = await matchOtp(body);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('OTP matched successfully');
      navigate(`${webRoutes?.resetPassword}?token=${data?.token}`);
    } else if (isError) {
      if (error) {
        errorHandler(error);
      }
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <h1 className='welcome text-center'>Check Your Email for OTP</h1>
      <Form onFinish={onFinish} className='z-10'>
        <Form.Item
          name='otp'
          rules={[
            {
              required: true,
              message: 'Enter the OTP',
            },
          ]}
        >
          <Input placeholder='Enter the OTP' size='large' className='p-3' />
        </Form.Item>

        <Form.Item
          style={{
            textAlign: 'center',
          }}
        >
          <Button
            htmlType='submit'
            type='primary'
            size='large'
            loading={isLoading}
            className='font-mono font-bold tracking-wider w-[80%] hover:bg-[#FFFFFF]  '
          >
            {isLoading ? 'Processing Next Step' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
