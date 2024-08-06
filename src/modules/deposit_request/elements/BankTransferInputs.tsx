import { Col, DatePicker, Form, InputNumber, Row, Select, Upload } from 'antd';
import React from 'react';
import UploadImageInputs from '../../common/UploadImageInputs';
import { bankArray } from '../utils/bankData';

const BankTransferInputs = () => {
  const { Option } = Select;

  return (
    <>
      <Row gutter={12}>
        <Col span={8}>
          <Form.Item
            name='deposited_from'
            label='Deposited From'
            rules={[
              { required: true, message: 'Please Select Deposited From' },
            ]}
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
            name='transfer_type'
            label='Transfer Type'
            rules={[{ required: true, message: 'Please Select Transfer Type' }]}
          >
            <Select placeholder='Select Transfer Type' allowClear>
              <Option value='NPSB'>NPSB</Option>
              <Option value='BFTN'>BFTN</Option>
              <Option value='RTGS'>RTGS</Option>
              <Option value='EFT'>EFT</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name='transaction_date'
            label='Transaction Date'
            rules={[
              {
                required: true,
                message: 'Please Transaction Date',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='deposited_to'
            label='Deposited To'
            rules={[{ required: true, message: 'Please Select Deposited To' }]}
          >
            <Select placeholder='Select Bank' allowClear>
              {bankArray.map((bank) => (
                <Option key={bank.id} value={bank.value}>
                  {bank.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name='bankAmount'
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
            name='depositImage'
            label='Choose file'
            uploadButtonText='upload your deposit file'
          />
        </Col>
      </Row>
    </>
  );
};

export default BankTransferInputs;
