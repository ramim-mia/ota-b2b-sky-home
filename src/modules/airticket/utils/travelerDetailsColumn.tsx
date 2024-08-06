import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Tag, Space, Button, Typography, Popconfirm } from 'antd'; // Make sure to import Tag and Space from 'antd'
import { IAirTicket } from '../type/airTicketTypes';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const travelerDetailsColumn: () => ColumnsType<any> = () => [
  {
    title: 'Given Name',
    dataIndex: 'givenName',
    key: 'givenName',
  },
  {
    title: 'Last Name',
    dataIndex: 'surname',
    key: 'surname',
  },
  {
    title: 'Phone',
    dataIndex: 'phones',
    key: 'phones',
    render: (phones: { number: string; label: string }[]) => (
      <Space size='middle'>
        {phones.map((phone, index) => (
          <Typography.Text key={index}>{phone.number}</Typography.Text>
        ))}
      </Space>
    ),
  },
  {
    title: 'Date of Birth',
    dataIndex: 'identityDocuments',
    key: 'birthDate',
    render: (identityDocuments: { birthDate: string }[]) =>
      identityDocuments.map((doc, index) => (
        <Typography.Text key={index}>
          {dayjs(doc.birthDate).format('YYYY-MM-DD')}
        </Typography.Text>
      )),
  },
  {
    title: 'Gender',
    dataIndex: 'identityDocuments',
    key: 'gender',
    render: (identityDocuments: { gender: string }[]) =>
      identityDocuments.map((doc, index) => (
        <Typography.Text key={index}>{doc.gender}</Typography.Text>
      )),
  },
  {
    title: 'Pax Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Passport No',
    dataIndex: '',
    key: '',
  },
];

export default travelerDetailsColumn;
