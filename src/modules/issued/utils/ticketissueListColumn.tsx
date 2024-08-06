import { ColumnsType } from 'antd/es/table';
import React from 'react';
import dayjs from 'dayjs';
import { ITicketIssued } from '../types/ticketIssuedTypes';
import { Link } from 'react-router-dom';

const ticketissueListColumn: () => ColumnsType<ITicketIssued> = () => {
  return [
    {
      title: ' Airline PNR',
      dataIndex: 'pnr_code',
      key: 'pnr_code',
    },
    {
      title: 'GDS PNR',
      dataIndex: '',
      key: '',
    },
    {
      title: 'Status',
      dataIndex: 'ticket_issue_status',
      key: 'ticket_issue_status',
    },
    {
      title: 'Ticket Number',
      key: 'flight_number',
      dataIndex: 'flight_number',
    },
    {
      title: 'Total Traveler',
      key: 'total_passenger',
      dataIndex: 'total_passenger',
    },
    {
      title: 'Action',
      key: 'total_passenger',
      dataIndex: 'total_passenger',
      render: (_, value) => (
        <Link to={`/issuedTicket/${value?.ticket_issue_id}`}>View</Link>
      ),
    },
  ];
};

export default ticketissueListColumn;
