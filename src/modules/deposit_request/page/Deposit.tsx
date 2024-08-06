import React, { useState } from 'react';
import { Button, Col, Form, Row, Select, Typography } from 'antd';
import BankTransferInputs from '../elements/BankTransferInputs';
import CashInputs from '../elements/CashInputs';
import ChequeInputs from '../elements/ChequeInputs';

const { Option } = Select;
const { Title } = Typography;
const Deposit = () => {
  const [form] = Form.useForm();
  const [selectedMethod, setSelectedMethod] = useState('Bank Transfer');

  const renderInputComponent = () => {
    switch (selectedMethod) {
      case 'Cash':
        return <CashInputs />;
      case 'Cheque':
        return <ChequeInputs />;
      case 'Bank Transfer':
        return <BankTransferInputs />;
      default:
        return null;
    }
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <>
      <Title level={4}>Deposit Request</Title>
      <Form
        layout='vertical'
        form={form}
        initialValues={{ deposit_method: 'Bank Transfer' }}
        onFinish={onFinish}
      >
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item
              name='deposit_method'
              label='Select Deposit Method'
              rules={[
                {
                  required: true,
                  message: 'Please Select Your Deposit Method',
                },
              ]}
            >
              <Select
                placeholder='Select a option and change input text above'
                allowClear
                onChange={(value) => setSelectedMethod(value)}
              >
                <Option value='Cash'>Cash</Option>
                <Option value='Cheque'>Cheque</Option>
                <Option value='Bank Transfer'>Bank Transfer</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {renderInputComponent()}
        <Form.Item style={{ textAlign: 'end' }}>
          <Button type='primary' htmlType='submit'>
            Book Ticket
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Deposit;
