import React, { useEffect, useState } from 'react';
import BasePageContainer from '../../../../app_components/PageContainer';
import { B2CRoutes, webRoutes } from '../../../../route/RouteLinks';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Table,
  message,
} from 'antd';
import { Link } from 'react-router-dom';

import { toasterNotification } from '../../../../utils/assyncWrapper';
import SearchTableInfo from '../../../common/SearchTableInfo';
import customerSupportColumn from '../utils/customerSupportColumn';
import { PlusOutlined } from '@ant-design/icons';
import { BreadcrumbProps } from 'antd/lib';

type Props = {};
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: B2CRoutes.customerSupport,
      title: <Link to={''}>Customer Support</Link>,
    },
  ],
};
const CustomerSupport = (props: Props) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  const handlePaginationChange = (current: number, pageSize: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current,
      pageSize,
    }));
  };
  const selectSearchs = (value: string) => {};
  const selectSearchon = (value: string) => {};
  return (
    <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
      <div className='flex items-center justify-between mb-2'>
        <Link to='/b2c/customer-complain'>
          <Button
            type='primary'
            style={{ padding: '0 8vh' }}
            icon={<PlusOutlined />}
          >
            Support Request
          </Button>
        </Link>
        <SearchTableInfo
          selectStatusFilter={selectSearchs}
          inputSearchChange={selectSearchon}
          options={[
            { value: 'complete', label: 'Viewed' },
            { value: 'incomplete', label: 'Open' },
            { value: 'refund', label: 'Answered' },
            { value: 'reissue', label: 'Customer Reply' },
          ]}
          hideSearch
        />
      </div>
      <Card title='Issue List (00)'>
        <Table
          size='small'
          bordered
          columns={customerSupportColumn({ pagination })}
          dataSource={[
            {
              title: 'need support',
              date: '20-sun-2023',
              status: 'Pending',
            },
          ]}
          pagination={
            5 !== undefined && 5 < 20
              ? false
              : {
                  ...pagination,
                  total: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ['20', '50', '100'],
                  onChange: handlePaginationChange,
                }
          }
        />
      </Card>
    </BasePageContainer>
  );
};

export default CustomerSupport;
