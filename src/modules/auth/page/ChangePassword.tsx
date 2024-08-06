import { Button, Form, Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';

import { TbPasswordUser } from 'react-icons/tb';
import errorHandler from '../../common/errorHandler';
import { useChangePasswordMutation } from '../api/authApiEndpoint';

const ChangePassword = ({
  isChangePassModalOpen,
  setIsChangePassModalOpen,
}: {
  isChangePassModalOpen: boolean;
  setIsChangePassModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [changePassword, { isError, isSuccess, error, isLoading }] =
    useChangePasswordMutation();
  const onFinish = async (values: {
    password: string;
    newPassword: string;
  }) => {
    await changePassword({
      old_password: values.password,
      new_password: values.newPassword,
    });
  };

  const handleCancel = () => {
    setIsChangePassModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Password changed successfully');
      setIsChangePassModalOpen(false);
    } else if (isError) {
      if (error) {
        errorHandler(error);
      }
    }
  }, [isError, isSuccess]);
  return (
    <Modal
      open={isChangePassModalOpen}
      onCancel={handleCancel}
      footer={null}
      title='Change Password?'
    >
      <Form onFinish={onFinish} className='z-10'>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Please input your old password!' },
          ]}
        >
          <Input.Password className='p-2' placeholder='Old Password' />
        </Form.Item>

        <Form.Item
          name='newPassword'
          rules={[
            { required: true, message: 'Please input your new password!' },
          ]}
        >
          <Input.Password className='p-2' placeholder='New Password' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' loading={isLoading} htmlType='submit'>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
