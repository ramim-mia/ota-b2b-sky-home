import {
  Button,
  Card,
  Col,
  Divider,
  Table,
  Tag,
  Typography,
  theme,
} from 'antd';
import React from 'react';
import airticketDetailsColumn from '../utils/airticketDetailsColumn';
import { IAirTicket } from '../type/airTicketTypes';
const { Text, Title } = Typography;
type IProps = {
  bookingInfo: IAirTicket;
};
const BookingConfirmation = ({ bookingInfo }: IProps) => {
  const { token } = theme.useToken();

  return (
    <div>
      <div className='mb-2'>
        <div className='flex justify-between mb-2'>
          <p className='text-sm'></p>
          <Divider orientation='left' plain>
            Booking Confirmation
          </Divider>
        </div>
        <Table
          size='small'
          pagination={false}
          columns={airticketDetailsColumn()}
          dataSource={[bookingInfo]}
          style={{ fontSize: '15px' }}
          className='BillingTable'
          rowClassName={'BillingTd'}
          bordered={false}
        />
      </div>
    </div>
  );
};

export default BookingConfirmation;
