import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import React from 'react';
import { bankArray } from '../utils/bankData';
import UploadImageInputs from '../../common/UploadImageInputs';

const { Option } = Select;
const ChequeInputs = () => {
  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label='Cheque Number'
            name='cheque_number'
            rules={[
              { required: true, message: 'Please input your Cheque Number!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='cheque_date'
            label='Cheque Date'
            rules={[
              {
                required: true,
                message: 'Please Cheque Date',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='bank_name'
            label='Bank Name'
            rules={[{ required: true, message: 'Please Select Bank Name' }]}
          >
            <Select placeholder='Select Bank' allowClear>
              {bankArray.map((bank) => (
                <Option key={bank.id} value={bank.value}>
                  {bank.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='chequeAmount'
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
        </Col>
      </Row>

      <UploadImageInputs
        name='chequeImage'
        label='Choose file'
        uploadButtonText='upload your cheque deposit file'
      />
    </>
  );
};

export default ChequeInputs;
