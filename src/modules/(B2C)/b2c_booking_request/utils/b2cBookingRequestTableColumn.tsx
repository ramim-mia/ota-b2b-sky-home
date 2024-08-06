// adminListColumn function
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Button, Space, Avatar, Image, Tag } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { imgHostLink } from '../../../../redux/request';
import { IGetB2cBookingRequest } from '../type/b2cBookingRequestType';

const b2cBookingRequestTableColumn: () => ColumnsType<IGetB2cBookingRequest> =
  () => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },

      {
        title: 'Journey Type',
        dataIndex: 'journey_type',
        key: 'journey_type',
      },

      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, { status }: any) => {
          let color = 'red';
          if (status === 'Pending') color = 'orange';
          if (status === 'Cancelled') color = 'red';
          if (status === 'Approved') color = 'green';

          return (
            <Tag color={color}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Tag>
          );
        },
      },
      {
        title: ' Agency Name',
        dataIndex: 'agency_name',
        key: 'agency_name',
      },

      {
        title: 'Action',
        key: 'action',
        render: (_, record: any) => (
          <Space size='small'>
            <Link to={`/b2c/bookingRequestDetails/${record?.id}`}>
              <Button size='small' type='primary'>
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

export default b2cBookingRequestTableColumn;
