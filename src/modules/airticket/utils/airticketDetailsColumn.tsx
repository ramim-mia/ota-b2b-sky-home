import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Tag, Space, Button, Typography, Popconfirm } from 'antd'; // Make sure to import Tag and Space from 'antd'
import { IAirTicket } from '../type/airTicketTypes';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const airticketDetailsColumn: () => ColumnsType<any> = () => [
  {
    title: 'Booking Date',
    key: 'action',
    render: (_, { booking_created_at }) => (
      <>{dayjs(booking_created_at).format('DD-MMM-YYYY')}</>
    ),
  },
  {
    title: 'Booking ID',
    dataIndex: 'booking_id',
    key: 'booking_id',
  },
  {
    title: 'Booking Status',
    dataIndex: 'booking_status',
    key: 'booking_status',
    render: (_, { booking_status }: any) => {
      let color = 'red';
      if (booking_status?.pending) color = 'orange';
      if (booking_status?.cancelled) color = 'red';
      if (booking_status?.issued) color = 'green';
      if (booking_status?.refund) color = 'blue';
      if (booking_status?.adm) color = 'purple';
      if (booking_status)
        return (
          <Tag color={color}>
            {booking_status?.charAt(0)?.toUpperCase() +
              booking_status?.slice(1)}
          </Tag>
        );
    },
  },

  {
    title: 'Booked By',
    dataIndex: 'user_first_name',
    key: 'user_first_name',
  },
  {
    title: 'Issue Before',
    key: 'action',
    render: (_, { ticket_issue_last_time }) => (
      <>{dayjs(ticket_issue_last_time).format('DD-MMM-YYYY')}</>
    ),
  },
  {
    title: 'Airline PNR',
    dataIndex: '',
    key: '',
  },
  {
    title: 'GDS PNR',
    dataIndex: 'pnr',
    key: 'pnr',
  },
];

export default airticketDetailsColumn;
