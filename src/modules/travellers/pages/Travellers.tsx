import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import SearchTableInfo from '../../common/SearchTableInfo';
import travellersColumn from '../utils/travellersColumn';
import { BreadcrumbProps } from 'antd/lib';
import { webRoutes } from '../../../route/RouteLinks';
import { Link } from 'react-router-dom';
import BasePageContainer from '../../../app_components/PageContainer';
import { size_limit } from '../../../constants/Pagination';
import { useLazyGetAllTravelerWithPaginationAndFilterQuery } from '../api/TravelersEndpoints';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.travelers,
      title: <Link to={webRoutes.addTraveler}>Travelers</Link>,
    },
    {
      key: webRoutes.travelers,
      title: <Link to={webRoutes.addTraveler}>All Travelers</Link>,
    },
  ],
};
const Travelers = () => {
  const [getAllTravelers, { data, isLoading }] =
    useLazyGetAllTravelerWithPaginationAndFilterQuery();
  const [input, setInputSearch] = useState<any>();

  /* search and filter */
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  useEffect(() => {
    getAllTravelers(
      `/btob/travelers?skip=${(pagination.current - 1) * size_limit}&limit=${
        pagination.pageSize
      }`
    );
  }, [pagination]);
  useEffect(() => {
    input
      ? getAllTravelers(`/btob/travelers?name=${input}`)
      : getAllTravelers(`/btob/travelers`);
  }, [input]);

  const selectSearchon = (value: string) => {
    setInputSearch(value);
  };
  const handlePaginationChange = (current: number, pageSize: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current,
      pageSize,
    }));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
        <div className='flex items-center justify-between mb-2'>
          <Link to='/travelers/add-travelers'>
            <Button
              type='primary'
              style={{ padding: '0 8vh' }}
              icon={<PlusOutlined />}
            >
              Add Traveler
            </Button>
          </Link>

          <SearchTableInfo inputSearchChange={selectSearchon} hideStatus />
        </div>
        <Table
          size='small'
          columns={travellersColumn(pagination.current, pagination.pageSize)}
          dataSource={data?.data}
          style={{ borderTop: '1px solid #E7E7E7' }}
          pagination={
            data?.total !== undefined && data?.total < 20
              ? false
              : {
                  ...pagination,

                  total: data?.total,
                  showSizeChanger: true,
                  pageSizeOptions: ['20', '50', '100'],
                  onChange: handlePaginationChange,
                }
          }
        />
      </BasePageContainer>
    </div>
  );
};

export default Travelers;
