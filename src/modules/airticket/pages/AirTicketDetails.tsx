import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BasePageContainer from '../../../app_components/PageContainer';
import {
  Alert,
  BreadcrumbProps,
  Button,
  Col,
  Collapse,
  Popconfirm,
  Row,
  Tag,
  Typography,
  message,
  theme,
} from 'antd';
import { webRoutes } from '../../../route/RouteLinks';
import {
  useCancelTicketBookingMutation,
  useConfirmTicketMutation,
  useGetBookingDetailsQuery,
} from '../api/airTicketEndpoints';
import PassengerDetails from '../component/PassengerDetails';
import { FlightSegment, IAirTicket } from '../type/airTicketTypes';
import BookingConfirmation from '../component/BookingConfirmation';
import FlightInformation from '../component/FlightInformation';
import FareDertails from '../component/FareDertails';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ConfirmIssue from '../component/ConfirmIssue';
import dayjs from 'dayjs';
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: webRoutes.airticket,
      title: <Link to={webRoutes.airticket}>Air-Ticket</Link>,
    },
    {
      key: webRoutes.airticket,
      title: <Link to={webRoutes.airticket}>Details</Link>,
    },
  ],
};
const AirTicketDetails = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { id } = useParams();
  const { data, isError, isFetching, isLoading } = useGetBookingDetailsQuery(
    id as string
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

  const handleCancelBooking = async () => {
    await cancelTicket({ booking_id: Number(id) });
  };
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
            <Col
              lg={16}
              className='flex flex-col gap-y-6'
              style={{
                minHeight: '11.5in',
                width: '8.27in',
                fontSize: '11px',
                background: '#fff',
                margin: '0px auto',
                boxSizing: 'border-box',
                padding: '0 15px',
              }}
            >
              <BookingConfirmation bookingInfo={bookingInfo as any} />
              <PassengerDetails
                travelers={travelers}
                bookingInfo={bookingInfo as any}
              />

              <FlightInformation flights={flights} />
              <FareDertails payments={payments} />
            </Col>

            <Col lg={8} className='flex flex-col gap-y-3'>
              <div className='flex gap-x-3'>
                {/* <Button
                  type='primary'
                  onClick={() => setIssueModal(true)}
                  disabled={bookingInfo.booking_status !== 'pending'}
                >
                  Issue
                </Button>

                <Popconfirm
                  title='Are you sure to Cancel?'
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  okText='Yes'
                  cancelText='No'
                  disabled={bookingInfo.booking_status !== 'pending'}
                  onConfirm={handleCancelBooking}
                >
                  <Button
                    type='primary'
                    danger
                    disabled={bookingInfo.booking_status !== 'pending'}
                  >
                    Cancel booking
                  </Button>
                </Popconfirm> */}
              </div>
              <Collapse
                bordered={false}
                items={[
                  {
                    key: '1',
                    label: <p className='font-semibold'>PNR History</p>,
                    children: (
                      <div className='flex flex-col gap-y-4'>
                        <div>
                          <Button type='link' className='font-bold'>
                            Booking Time Limit -{' '}
                            {data?.data?.ticket_issue_last_time &&
                              dayjs(data?.data?.ticket_issue_last_time).format(
                                'DD MMM YY hh:mm A'
                              )}
                          </Button>
                          <Alert
                            message='Please cancel the booking before the time limit expires, or additional charges will be applied.'
                            type='warning'
                            showIcon
                            className='my-2'
                          />
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: '2',
                    label: <p className='font-semibold'>Download/PDF</p>,
                    children: (
                      <div>
                        <Button type='primary'>Download/PDF</Button>
                        <Button type='primary' className='ms-2'>
                          Send Email
                        </Button>
                      </div>
                    ),
                  },
                  {
                    key: '3',
                    label: <p className='font-semibold'>Fare Rules</p>,
                    children: (
                      <p className='font-semibold text-base'>
                        No automatic fare rules available, Please mail us for
                        fare rules.
                      </p>
                    ),
                  },
                ]}
                defaultActiveKey={['1']}
              />
            </Col>
          </Row>
        </>
      )}

      <ConfirmIssue open={issueModal} setOpen={setIssueModal} pnrId={id} />
    </BasePageContainer>
  );
};

export default AirTicketDetails;
