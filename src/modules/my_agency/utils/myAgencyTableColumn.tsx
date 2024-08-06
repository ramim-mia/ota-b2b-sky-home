// adminListColumn function
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Button, Space, Avatar, Image, Tag } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { imgHostLink } from '../../../redux/request';
import { IGetAgency } from '../type/myAgencyType';

const subAgencyTableColumn: () => ColumnsType<IGetAgency> = () => {
  // const agencyTableColumn: () => ColumnsType<IGetAgency> = () => {

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },

    {
      title: 'Agency Name',
      dataIndex: 'agency_name',
      key: 'agency_name',
      render: (_, record) => (
        <div className='flex items-center  gap-2'>
          <img
            width={40}
            style={{ objectFit: 'cover' }}
            src={`${imgHostLink}${record.logo}`}
            alt=''
          />
          <span>{record.agency_name}</span>
        </div>
      ),
    },

    {
      title: 'Commission',
      dataIndex: 'commission',
      key: 'commission',
      render: (commission) => {
        return `${commission}%`;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return status === 1 ? (
          <Tag color='green'> Active</Tag>
        ) : (
          <Tag color='red'>Inactive</Tag>
        );
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => (
        <Space size='small'>
          <Link to={`/myAgencyDetails/${record?.id}`}>
            <Button
              size='small'
              type='primary'
              // onClick={() => handleViewAdmin(record.id)}
            >
              View
            </Button>
          </Link>

          {/* <Button
            size="small"
            type="primary"
            onClick={() => handleEditAdmin(record.id)}
          >
            Edit
          </Button> */}
        </Space>
      ),
    },
  ];
};

export default subAgencyTableColumn;
