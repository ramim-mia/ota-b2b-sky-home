import { Button, Card, Form, InputNumber, Select, Typography } from 'antd';
import React, { useState, useEffect } from 'react';

const InstanceDepositFields = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { Option } = Select;
  const [amount, setAmount] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleNumberInputKeyDown = (e: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (
      !(
        e.key === 'Backspace' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Delete'
      ) &&
      isNaN(Number(e.key))
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    form.setFieldsValue({ total_Deposit: amount });
    const isSubmitDisabled = form.getFieldValue('total_Deposit') < 20;
    setIsSubmitDisabled(isSubmitDisabled);
  }, [amount, form]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Card className='mt-5'>
      <Title level={4} className='m-0'>
        Pay with Bkash
      </Title>
      <Form
        layout='vertical'
        form={form}
        onFinish={onFinish}
        initialValues={{ getaway_fee: 0 }}
      >
        <Form.Item
          name='transfer_type'
          label='Transfer Type'
          rules={[{ required: true, message: 'Please Select Transfer Type' }]}
        >
          <Select placeholder='Select Transfer Type' allowClear>
            <Option value='Bkash With Number'>Bkash With Number</Option>
          </Select>
        </Form.Item>

        <Form.Item name='getaway_fee' label='Getaway Fee(%)'>
          <InputNumber disabled style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name='amount'
          label='Amount (Minimum 20 TK)'
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                if (value < 20) {
                  return Promise.reject('Minimum Deposit is 20 TK');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            onChange={(value) => setAmount(Number(value))}
            onKeyDown={handleNumberInputKeyDown}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name='total_Deposit' label='Amount To Be Deposited'>
          <InputNumber disabled style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Pay with Bkash
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default InstanceDepositFields;
