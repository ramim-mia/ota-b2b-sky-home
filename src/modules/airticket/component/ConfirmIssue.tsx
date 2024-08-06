import { Col, Form, Input, Modal, Row, Button, Select } from 'antd';
import React, { useEffect } from 'react';

import { useConfirmTicketMutation } from '../api/airTicketEndpoints';

const ConfirmIssue = ({ open, setOpen, pnrId }: any) => {
  const [form] = Form.useForm();
  const [confirmTicket, { data, isSuccess, isLoading }] =
    useConfirmTicketMutation();

  const handleFinish = async (value: any) => {
    const body = {
      bank: value.bank.toUpperCase(),
      booking_id: Number(pnrId),
    };
    await confirmTicket(body);
  };

  // Redirect after mutation success
  useEffect(() => {
    if (isSuccess) {
      if (data && 'redirectUrl' in data) {
        window.location.href = data?.redirectUrl as string;
      }
    }
  }, [isSuccess, data]);

  return (
    <Modal
      title='Confirm Ticket Issue'
      centered
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen(false)}
      footer={[
        <Button
          key='submit'
          type='primary'
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Issue
        </Button>,

        <Button key='back' onClick={() => setOpen(false)}>
          Cancel
        </Button>,
      ]}
    >
      <Form layout='vertical' form={form} onFinish={handleFinish}>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label='Bank Name' name='bank'>
              <Select
                placeholder='select bank name'
                options={[
                  { value: 'FSIB', label: 'FSIB' },
                  { value: 'NBL', label: 'NBL' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ConfirmIssue;
