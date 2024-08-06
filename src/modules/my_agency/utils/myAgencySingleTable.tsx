// adminListColumn function
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Button, Space, Avatar, Image, Tag, Popconfirm, Switch } from 'antd';

import { Link } from 'react-router-dom';
import { BtocToken, IGetSingleAgencyUser } from '../type/myAgencyType';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { imgHostLink } from '../../../redux/request';

const subAgencySingleTable: () => ColumnsType<IGetSingleAgencyUser> = () => {
  const handleChangeStatus = (id: number | undefined) => {};
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, img) => (
        <div className='flex items-center gap-3'>
          {img?.photo ? (
            <img
              src={`${imgHostLink}/${img?.photo}`}
              alt='agency_user_photo'
              width={25}
              height={25}
              className='rounded-full'
            />
          ) : (
            <Avatar size={25} icon={<UserOutlined />} />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'User Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',

      render: (status, data) => (
        <>
          <Popconfirm
            title={`${status ? 'Sure to Inactive?' : 'Sure to active?'}`}
            onConfirm={() => handleChangeStatus(data?.id)}
          >
            <Switch
              style={{
                backgroundColor: data?.status ? 'green' : '#ff4d4f',
              }}
              checkedChildren='Active'
              unCheckedChildren='Inactive'
              checked={data?.status ? true : false}
            />
          </Popconfirm>
        </>
      ),
    },

    {
      title: 'Created Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => (
        <div className='flex gap-1'>
          <span>{dayjs(date).format('DD-MM-YYYY ') || 'N/A'}</span>
          <span>&#40;{dayjs(date).format('hh:mm A') || ''}&#41;</span>
        </div>
      ),
    },
  ];
};

export default subAgencySingleTable;
