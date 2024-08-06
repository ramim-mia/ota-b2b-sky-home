import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Link } from 'react-router-dom';
import { ITicketList } from '../types/ticketListTypes';

const allTicketListColumn = (): ColumnsType<ITicketList> => {
  return [
    {
      title: 'SL',
      dataIndex: 'SL',
      key: 'SL',
      render: (_, record, index) => index + 1,
    },
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
      title: 'Booking Status',
      dataIndex: 'booking_status',
      key: 'booking_status',
    },
    {
      title: 'Total Traveler',
      key: 'total_passenger',
      dataIndex: 'total_passenger',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_, value) => (
        <Link to={`/b2c/ticket/${value?.booking_id}`}>View</Link>
      ),
    },
  ];
};

export default allTicketListColumn;
