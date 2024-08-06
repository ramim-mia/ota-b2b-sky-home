import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  designation: string;
  created_on: string;
}

export const data = [
  {
    key: '1',
    name: 'amanullah',
    email: 'aman@gmail.com',
    phone: '01725502623',
    role: 'admin',
    designation: 'developer',
    created_on: '11-27-2023',
  },
  {
    key: '2',
    name: 'john doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    role: 'user',
    designation: 'analyst',
    created_on: '11-28-2023',
  },
  {
    key: '3',
    name: 'alice smith',
    email: 'alice.smith@example.com',
    phone: '9876543210',
    role: 'manager',
    designation: 'designer',
    created_on: '11-29-2023',
  },
  {
    key: '4',
    name: 'emma watson',
    email: 'emma.watson@example.com',
    phone: '5551234567',
    role: 'admin',
    designation: 'engineer',
    created_on: '11-30-2023',
  },
  {
    key: '5',
    name: 'james brown',
    email: 'james.brown@example.com',
    phone: '7890123456',
    role: 'user',
    designation: 'architect',
    created_on: '12-01-2023',
  },
  {
    key: '6',
    name: 'sara white',
    email: 'sara.white@example.com',
    phone: '3216549870',
    role: 'manager',
    designation: 'developer',
    created_on: '12-02-2023',
  },
  {
    key: '7',
    name: 'alex turner',
    email: 'alex.turner@example.com',
    phone: '4567890123',
    role: 'admin',
    designation: 'analyst',
    created_on: '12-03-2023',
  },
  {
    key: '8',
    name: 'olivia green',
    email: 'olivia.green@example.com',
    phone: '9876543210',
    role: 'user',
    designation: 'designer',
    created_on: '12-04-2023',
  },
  {
    key: '9',
    name: 'david smith',
    email: 'david.smith@example.com',
    phone: '5678901234',
    role: 'manager',
    designation: 'engineer',
    created_on: '12-05-2023',
  },
  {
    key: '10',
    name: 'lily johnson',
    email: 'lily.johnson@example.com',
    phone: '1098765432',
    role: 'admin',
    designation: 'architect',
    created_on: '12-06-2023',
  },
  {
    key: '11',
    name: 'ryan lee',
    email: 'ryan.lee@example.com',
    phone: '2345678901',
    role: 'user',
    designation: 'developer',
    created_on: '12-07-2023',
  },
  {
    key: '12',
    name: 'hannah baker',
    email: 'hannah.baker@example.com',
    phone: '8765432109',
    role: 'manager',
    designation: 'analyst',
    created_on: '12-08-2023',
  },
  {
    key: '13',
    name: 'michael brown',
    email: 'michael.brown@example.com',
    phone: '3456789012',
    role: 'admin',
    designation: 'designer',
    created_on: '12-09-2023',
  },
  {
    key: '14',
    name: 'emily miller',
    email: 'emily.miller@example.com',
    phone: '9012345678',
    role: 'user',
    designation: 'engineer',
    created_on: '12-10-2023',
  },
  {
    key: '15',
    name: 'jackson turner',
    email: 'jackson.turner@example.com',
    phone: '4321098765',
    role: 'manager',
    designation: 'architect',
    created_on: '12-11-2023',
  },
  {
    key: '16',
    name: 'zoey white',
    email: 'zoey.white@example.com',
    phone: '6789012345',
    role: 'admin',
    designation: 'developer',
    created_on: '12-12-2023',
  },
  {
    key: '17',
    name: 'charlie jackson',
    email: 'charlie.jackson@example.com',
    phone: '2109876543',
    role: 'user',
    designation: 'analyst',
    created_on: '12-13-2023',
  },
  {
    key: '18',
    name: 'victoria brown',
    email: 'victoria.brown@example.com',
    phone: '5432109876',
    role: 'manager',
    designation: 'designer',
    created_on: '12-14-2023',
  },
  {
    key: '19',
    name: 'mason williams',
    email: 'mason.williams@example.com',
    phone: '8765432109',
    role: 'admin',
    designation: 'engineer',
    created_on: '12-15-2023',
  },
  {
    key: '20',
    name: 'madison turner',
    email: 'madison.turner@example.com',
    phone: '1234567890',
    role: 'architect',
    designation: 'developer',
    created_on: '12-16-2023',
  },
  {
    key: '21',
    name: 'owen white',
    email: 'owen.white@example.com',
    phone: '0987654321',
    role: 'admin',
    designation: 'analyst',
    created_on: '12-17-2023',
  },
  {
    key: '22',
    name: 'zoe williams',
    email: 'zoe.williams@example.com',
    phone: '2345678901',
    role: 'user',
    designation: 'designer',
    created_on: '12-18-2023',
  },
  {
    key: '23',
    name: 'samuel brown',
    email: 'samuel.brown@example.com',
    phone: '7890123456',
    role: 'manager',
    designation: 'engineer',
    created_on: '12-19-2023',
  },
  {
    key: '24',
    name: 'grace miller',
    email: 'grace.miller@example.com',
    phone: '3210987654',
    role: 'admin',
    designation: 'architect',
    created_on: '12-20-2023',
  },
  {
    key: '25',
    name: 'luke jackson',
    email: 'luke.jackson@example.com',
    phone: '5678901234',
    role: 'user',
    designation: 'developer',
    created_on: '12-21-2023',
  },
  {
    key: '26',
    name: 'sophia turner',
    email: 'sophia.turner@example.com',
    phone: '1098765432',
    role: 'manager',
    designation: 'analyst',
    created_on: '12-22-2023',
  },
  {
    key: '27',
    name: 'liam white',
    email: 'liam.white@example.com',
    phone: '2345678901',
    role: 'admin',
    designation: 'designer',
    created_on: '12-23-2023',
  },
  {
    key: '28',
    name: 'haley smith',
    email: 'haley.smith@example.com',
    phone: '3456789012',
    role: 'user',
    designation: 'engineer',
    created_on: '12-24-2023',
  },
  {
    key: '29',
    name: 'logan brown',
    email: 'logan.brown@example.com',
    phone: '4567890123',
    role: 'architect',
    designation: 'developer',
    created_on: '12-25-2023',
  },
  {
    key: '30',
    name: 'amelia turner',
    email: 'amelia.turner@example.com',
    phone: '5678901234',
    role: 'admin',
    designation: 'analyst',
    created_on: '12-26-2023',
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
  },
  {
    title: 'Created On',
    dataIndex: 'created_on',
  },

  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='small'>
        <Button size='small' type='primary'>
          Edit
        </Button>
        <Button size='small' type='primary' danger>
          Delete
        </Button>
      </Space>
    ),
  },
];

const Users = () => {
  return <Table className='mt-5' columns={columns} dataSource={data} />;
};

export default Users;
