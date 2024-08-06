import { ColumnsType } from 'antd/es/table';
import React from 'react';

const fareDetailsColumn = (): ColumnsType<any> => [
  {
    title: 'Type',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Base',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Tax',
    dataIndex: 'taxes',
    key: 'taxes',
  },
  {
    title: 'Commission',
    dataIndex: '',
    key: '',
  },
  {
    title: 'AIT',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Pax',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Total Pax Fare',
    dataIndex: 'total',
    key: 'total',
  },
];

export default fareDetailsColumn;
