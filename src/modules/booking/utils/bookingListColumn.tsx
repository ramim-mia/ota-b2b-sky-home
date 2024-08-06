import { ColumnsType } from 'antd/es/table';
import React from 'react';
import dayjs from 'dayjs';

const bookingListColumn: () => ColumnsType<any> = () => [
  {
    title: 'Booking ID',
    dataIndex: 'booking_id',
    key: 'booking_id',
  },

  {
    title: ' Airline PNR',
    dataIndex: 'pnr_code',
    key: 'pnr_code',
  },
  {
    title: 'Route',
    dataIndex: 'total_passenger',
    key: 'total_passenger',
  },
  {
    title: 'Type',
    key: '',
    dataIndex: '',
  },

  {
    title: 'Fare Type',
    key: 'action',
  },
  {
    title: 'Booked At',
    key: 'action',
    render: (_, { booking_created_at }) => (
      <>{dayjs(booking_created_at).format('DD-MMM-YYYY')}</>
    ),
  },
  {
    title: 'Booked By',
    key: 'action',
  },
];

export default bookingListColumn;
