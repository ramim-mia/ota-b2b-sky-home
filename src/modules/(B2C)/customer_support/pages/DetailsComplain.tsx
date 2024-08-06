import React, { useRef, useState } from 'react';
import BasePageContainer from '../../../../app_components/PageContainer';
import {
  BreadcrumbProps,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { webRoutes } from '../../../../route/RouteLinks';
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import JoditEditor from 'jodit-react';
import UploadImageInputs from '../../../common/UploadImageInputs';
const { Option } = Select;
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: '/b2c/customer-support',
      title: <Link to={'/b2c/customer-support'}>Back Complain List</Link>,
    },
  ],
};
const DetailsComplain = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const onFinish = (values: any) => {
    const formData = new FormData();
    const { photo, ...allData } = values;
    for (const key in allData) {
      if (allData[key] !== undefined && allData[key] !== '') {
        formData.append(key, allData[key]);
      }
    }

    if (content) {
      formData.append('editorText', content);
    }
    if (photo !== undefined && photo?.fileList[0]?.originFileObj) {
      formData.append('photo', photo.fileList[0].originFileObj);
    }
  };
  return (
    <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
      <Card
        style={{
          width: '800px',
          margin: 'auto',
          marginBottom: '10px',
          border: '1px solid gray',
        }}
      >
        <p className='text-xl font-bold text-center underline'>
          View Id: <span className='font-semibold '>60</span>
        </p>

        <div className='mt-5'>
          <p className='text-lg font-bold flex justify-between'>
            <span>
              Subject: <span className='font-semibold'>Need To Support</span>{' '}
            </span>
            <span>
              Complain By:{' '}
              <span className='font-semibold'>Siraj OTA Tour&Travels</span>{' '}
            </span>
          </p>

          <p className='text-lg font-bold mt-10'>
            Complain Message:{' '}
            <span className='font-semibold p-4 rounded-lg bg-[#F9F9F9]'>
              Ticket Issue Problem
            </span>{' '}
          </p>
        </div>
      </Card>
      <Card
        style={{ width: '800px', margin: 'auto' }}
        title={<span className='text-xl'>Complain Reply</span>}
      >
        <Row justify={'center'}>
          <Form
            name='basic'
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
          >
            <Row justify={'center'}></Row>
            <Row gutter={[10, 0]}>
              <Col lg={12}>
                <Form.Item
                  name='transfer_type'
                  label='Select PNR'
                  rules={[
                    { required: true, message: 'Please Select Transfer Type' },
                  ]}
                >
                  <Select placeholder='Select Transfer Type' allowClear>
                    <Option value='NPSB'>NPSB</Option>
                    <Option value='BFTN'>BFTN</Option>
                    <Option value='RTGS'>RTGS</Option>
                    <Option value='EFT'>EFT</Option>
                  </Select>
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
              <Col lg={24}>
                <Form.Item
                  label='Subject'
                  name='mobile_number'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phoneNumber!',
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col lg={24}>
                <JoditEditor
                  className='my-4'
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                />
              </Col>

              <Col lg={6}>
                <UploadImageInputs
                  name='photo'
                  label='Choose file'
                  uploadButtonText='Choose file'
                />
              </Col>
            </Row>
            <Row>
              <Col lg={24}>
                <Form.Item>
                  <Button className='w-full' type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Card>
    </BasePageContainer>
  );
};

export default DetailsComplain;
