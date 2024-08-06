import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Tag, Space } from 'antd'; // Make sure to import Tag and Space from 'antd'
import dayjs from 'dayjs';

interface DataType {
  id: number;
  bank: string;
  created_at: string;
  pnr_code: string;
  total_amount: string;
}

const transactionHistoryColumn: () => ColumnsType<DataType> = () => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'PNR',
    dataIndex: 'pnr_code',
    key: 'pnr_code',
  },

  {
    title: 'Amount',
    dataIndex: 'total_amount',
    key: 'total_amount',
  },
  {
    title: 'Bank Name',
    dataIndex: 'bank',
    key: 'bank',
  },
  {
    title: 'Reference',
    dataIndex: '',
    key: '',
  },

  {
    title: 'Transaction Date',
    key: 'created_at',
    dataIndex: 'created_at',
    render: (_, { created_at }) => (
      <>{dayjs(created_at).format('DD-MMM-YYYY')}</>
    ),
  },
];

export default transactionHistoryColumn;
