import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Tag, Space } from 'antd'; // Make sure to import Tag and Space from 'antd'

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const generalLedgerColumn: () => ColumnsType<DataType> = () => [
  {
    title: 'Reference Id',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Date',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Remarks',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag
              color={color}
              key={tag}
            >
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Amount',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
      </Space>
    ),
  },
  {
    title: 'Balance',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
      </Space>
    ),
  },
];

export default generalLedgerColumn;
