import { Col, Form, Input, InputNumber, Row } from 'antd';
import React from 'react';
import UploadImageInputs from '../../common/UploadImageInputs';

const CashInputs = () => {
  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label='Depositor Name'
            name='depositor_Name'
            rules={[
              { required: true, message: 'Please input your Depositor Name' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Receiver Name'
            name='receiver_name'
            rules={[
              { required: true, message: 'Please input your Receiver Name' },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='cashAmount'
            label='Enter Amount'
            rules={[
              {
                type: 'number',
                message: 'Please enter a valid Amount',
              },
              {
                required: true,
                message: 'Please input a amount number!',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder='Enter a number'
            />
          </Form.Item>
          <UploadImageInputs
            name='cash_deposit_amount'
            label='Choose file'
            uploadButtonText='upload your cash deposit file'
          />
        </Col>
      </Row>
    </>
  );
};

export default CashInputs;
