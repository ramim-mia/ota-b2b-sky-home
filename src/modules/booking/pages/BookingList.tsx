import React from 'react';
import BasePageContainer from '../../../app_components/PageContainer';
import { webRoutes } from '../../../route/RouteLinks';
import { Link } from 'react-router-dom';
import { BreadcrumbProps } from 'antd';
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: webRoutes.issuedTicket,
      title: <Link to={''}>Issued Ticket</Link>,
    },
  ],
};
const BookingList = () => {
  return (
    <BasePageContainer
      breadcrumb={breadcrumb}
      transparent={true}
    >
      <div>dfsa</div>
    </BasePageContainer>
  );
};

export default BookingList;
