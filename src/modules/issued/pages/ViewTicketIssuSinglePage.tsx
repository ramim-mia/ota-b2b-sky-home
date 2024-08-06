import React, { useEffect, useState } from 'react';
import BasePageContainer from '../../../app_components/PageContainer';
import {
  Alert,
  BreadcrumbProps,
  Button,
  Card,
  Col,
  Row,
  Table,
  Typography,
  message,
  theme,
} from 'antd';
import { webRoutes } from '../../../route/RouteLinks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetSingleTicketIssueDetailsQuery } from '../api/ticketIssuedEndpoints';
import dayjs, { Dayjs } from 'dayjs';
import {
  useCancelTicketBookingMutation,
  useConfirmTicketMutation,
  useGetBookingDetailsQuery,
} from '../../airticket/api/airTicketEndpoints';
import BookingConfirmation from '../../airticket/component/BookingConfirmation';
import PassengerDetails from '../../airticket/component/PassengerDetails';
import FlightInformation from '../../airticket/component/FlightInformation';
import FareDertails from '../../airticket/component/FareDertails';
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: webRoutes.issuedTicket,
      title: <Link to={webRoutes.issuedTicket}>All Ticket Issue</Link>,
    },
  ],
};
const ViewTicketIssuSinglePage = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { id } = useParams();
  const { data, isError, isFetching, isLoading } = useGetBookingDetailsQuery(
    '136' as string
  );
  const [confirmTicket, { isSuccess }] = useConfirmTicketMutation();
  const [cancelTicket, { isSuccess: canSucc }] =
    useCancelTicketBookingMutation();
  const { travelers, payments, flights, ...bookingInfo } = { ...data?.data };
  const [issueModal, setIssueModal] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      message.success('Your Booking has been confirmed');
      navigate('/airticket');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (canSucc) {
      message.success('Booking successfully canceled');
      navigate('/airticket');
    }
  }, [canSucc]);

  return (
    <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
      {isError ? (
        <>
          <Alert message='Something Went Wrong' type='warning' />
        </>
      ) : (
        <>
          <Row gutter={[20, 0]}>
            <Col lg={16} className='flex flex-col gap-y-6'>
              <BookingConfirmation bookingInfo={bookingInfo as any} />
              <PassengerDetails
                travelers={travelers}
                bookingInfo={bookingInfo as any}
              />

              <FlightInformation flights={flights} />
              <FareDertails payments={payments} />
            </Col>
          </Row>
        </>
      )}
    </BasePageContainer>
  );
};

export default ViewTicketIssuSinglePage;
