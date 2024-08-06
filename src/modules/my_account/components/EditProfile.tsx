import { Alert, Button, Col, Form, Input, Modal, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Loading from '../../common/Loading';
import UploadImageInputs from '../../common/UploadImageInputs';
import { useNavigate } from 'react-router-dom';
import errorHandler from '../../common/errorHandler';
import { useUpdateProfileMutation } from '../api/profileApiEndpoint';
import { useAppDispatch, useAppSelector } from '../../../utils/ReduxHook';
import { setUser } from '../../../redux/slice/userSlice';
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditProfile = ({ open, setOpen }: Props) => {
  const [form] = Form.useForm();
  const [
    updateProfile,
    { data: responseData, isSuccess, isError, error, isLoading },
  ] = useUpdateProfileMutation();
  const user = useAppSelector((state) => state.user);
  const [userPhoto, setUserPhoto] = useState<string>();

  useEffect(() => {
    if (user) {
      const { name, mobile_number, photo } = user;
      form.setFieldsValue({
        name,

        mobile_number,
      });

      if (photo) {
        setUserPhoto(photo as any);
      }
    }
  }, [user]);

  const [updateData, setUpdateData] = useState<any>();
  const onFinish = async (values: any) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.delete('photo');
    if (values.photo) {
      formData.append('photo', values.photo.fileList[0]?.originFileObj);
    }
    setUpdateData(values);
    await updateProfile(formData);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess) {
      message.success('User successfully Updated');
      const data = {
        name: updateData?.name,
        mobile_number: updateData?.mobile_number,
        photo: responseData?.data?.photo
          ? responseData?.data?.photo
          : user?.photo,
      };
      dispatch(setUser({ data: data }));

      setOpen(false);
    } else if (isError) {
      if (error) {
        errorHandler(error);
      }
    }
  }, [isSuccess, isError, updateData]);

  return (
    <Modal
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      open={open}
      title='Update Profile'
      destroyOnClose
    >
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Alert type='info' message='User Info' showIcon className='mb-4' />
        <Form.Item label=' Name' name='name' validateTrigger={['onChange']}>
          <Input />
        </Form.Item>

        <Form.Item
          label=' Phone'
          name='mobile_number'
          validateTrigger={['onChange']}
        >
          <Input />
        </Form.Item>
        <UploadImageInputs
          name='photo'
          label='User Photo'
          uploadButtonText='Update User Photo'
          updateImgUrl={userPhoto}
        />
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
    </Modal>
  );
};

export default EditProfile;
