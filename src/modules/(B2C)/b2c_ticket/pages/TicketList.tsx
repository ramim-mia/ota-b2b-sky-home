import React, { useEffect, useState } from 'react';
import BasePageContainer from '../../../../app_components/PageContainer';
import SearchTableInfo from '../../../common/SearchTableInfo';
import { BreadcrumbProps, Table } from 'antd';
import { webRoutes } from '../../../../route/RouteLinks';
import { Link } from 'react-router-dom';
import allTicketListColumn from '../utils/allTicketListColumn';
import { useLazyGetAllTicketListQuery } from '../api/ticketListEndpoints';

type Props = {};
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: webRoutes.issuedTicket,
      title: <Link to={''}>All Ticket</Link>,
    },
  ],
};
const TicketList = (props: Props) => {
  const [getAllTicketList, { data }] = useLazyGetAllTicketListQuery();
  const [status, setStatus] = useState<any>();

  /* search and filter */
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  useEffect(() => {
    getAllTicketList(
      `/btob/btoc-user/ticket?skip=${pagination.current - 1}&limit=${
        pagination.pageSize
      }`
    );
  }, [pagination]);
  useEffect(() => {
    status
      ? getAllTicketList(`/btob/btoc-user/ticket?booking_status=${status}`)
      : getAllTicketList(`/btob/btoc-user/ticket`);
  }, [status]);

  const selectSearchs = (value: string) => {
    setStatus(value);
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
    <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
      <div>
        <SearchTableInfo
          title='Ticket List'
          selectStatusFilter={selectSearchs}
          options={[
            { value: 'incomplete', label: 'Incomplete' },
            { value: 'refund', label: 'Refund' },
            { value: 'reissue', label: 'Reissue' },
            { value: 'void', label: 'void' },
          ]}
          hideSearch
        />
        <Table
          size='small'
          columns={allTicketListColumn()}
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
      </div>
    </BasePageContainer>
  );
};

export default TicketList;
