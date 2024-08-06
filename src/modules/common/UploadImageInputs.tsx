import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Upload, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { imgHostLink } from '../../redux/request';

export const acceptedFileTypes = [
  'image/jpeg',
  'image/jpeg',
  'image/png',
  'application/pdf',
  'image/webp',
];

type Props = {
  name: string;
  label: string;
  uploadButtonText: string;
  updateImgUrl?: string;
  required?: boolean;
};
const UploadImageInputs = ({
  name,
  label,
  uploadButtonText,
  updateImgUrl,
  required,
}: Props) => {
  const [fileType, setFileType] = useState<RcFile>();
  const [imageFile, setImageFile] = useState<string>();

  //  before upload validation
  const beforeUpload = (file: RcFile) => {
    setFileType(file);
    const isJpgOrPng = acceptedFileTypes.includes(file.type);

    setImageFile(URL.createObjectURL(file));

    if (!isJpgOrPng) {
      message.error('Accepted File Formats - JPG/JPEG/PNG/WEBP/PDF');
      setImageFile(undefined);
      return isJpgOrPng || Upload.LIST_IGNORE;
    }
    const limitFileSize = file.size / 1024 / 1024 < 0.9;
    // if (!limitFileSize) {
    //   message.error('File size must be less than 500 KB');
    //   setImageFile(undefined);
    //   return limitFileSize || Upload.LIST_IGNORE;
    // }
    return false;
  };
  useEffect(() => {
    if (updateImgUrl) {
      setImageFile(imgHostLink + '/' + updateImgUrl);
    }
  }, [updateImgUrl]);
  return (
    <>
      <Form.Item
        label={label}
        name={name}
        valuePropName={name}
        className='w-full'
        rules={[{ required: required, message: `Upload ${label}` }]}
      >
        <Upload
          accept={'image/jpeg,image/jpeg,image/png,image/webp'}
          maxCount={1}
          beforeUpload={beforeUpload}
          onRemove={() => {
            setImageFile(undefined);
          }}
        >
          <Button icon={<UploadOutlined />}>{uploadButtonText}</Button>
        </Upload>
      </Form.Item>
      {imageFile &&
        (fileType?.type == 'application/pdf' ? (
          <iframe src={imageFile} width={100} />
        ) : (
          <Image src={imageFile} width={100} />
        ))}
    </>
  );
};

export default UploadImageInputs;
