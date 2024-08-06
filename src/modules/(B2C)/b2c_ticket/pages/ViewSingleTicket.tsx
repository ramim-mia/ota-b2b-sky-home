import React from 'react';
import { BreadcrumbProps, Card, Col, Row, Table, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { B2CRoutes, webRoutes } from '../../../../route/RouteLinks';
import { useGetSingleTicketDetailsQuery } from '../api/ticketListEndpoints';
import BasePageContainer from '../../../../app_components/PageContainer';
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: B2CRoutes.ticket,
      title: <Link to={'/' + B2CRoutes.ticket}>All Ticket List</Link>,
    },
  ],
};
const ViewSingleTicket = () => {
  const { Text } = Typography;
  const { id } = useParams();
  const { data } = useGetSingleTicketDetailsQuery(id as string);
  const columns: any = [
    {
      title: 'Airline Code',
      dataIndex: 'airline_code',
      key: 'airline_code',
      align: 'center',
    },
    {
      title: 'Flight Number',
      dataIndex: 'flight_number',
      key: 'flight_number',
      align: 'center',
    },
    {
      title: 'Flight Booking ID',
      dataIndex: 'flight_booking_Id',
      key: 'flight_booking_Id',
      align: 'center',
    },
    {
      title: 'Departure Time',
      dataIndex: 'departure_time',
      key: 'departure_time',
      align: 'center',
      render: (_: any, value: any) =>
        dayjs(value.departure_time, 'MM-DDTHH:mm').format('HH:mm A'),
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrival_time',
      key: 'arrival_time',
      align: 'center',
      render: (_: any, value: any) =>
        dayjs(value.arrival_time, 'MM-DDTHH:mm').format('HH:mm A'),
    },
    {
      title: 'From',
      dataIndex: 'origin_loc_code',
      key: 'origin_loc_code',
      align: 'center',
    },
    {
      title: 'To',
      dataIndex: 'destination_loc_code',
      key: 'destination_loc_code',
      align: 'center',
    },
  ];
  return (
    <BasePageContainer
      breadcrumb={breadcrumb}
      transparent={true}
    >
      <Row justify={'center'}>
        <Col lg={12}>
          <Card
            size='small'
            title='Details of Return Ticket'
            className='mb-3'
          >
            <Row justify={'space-between'}>
              <Col>
                <Col>
                  <Text>
                    Total Passenger :{' '}
                    <Text type='secondary'>{data?.data?.total_passenger}</Text>{' '}
                  </Text>
                </Col>
                <Col>
                  <Text>
                    PNR : <Text type='secondary'>{data?.data?.pnr_code}</Text>{' '}
                  </Text>
                </Col>
                <Col>
                  <Text>
                    Booking Status :
                    <Text type='secondary'> {data?.data?.booking_status}</Text>{' '}
                  </Text>
                </Col>
              </Col>
              <Col></Col>
              <Col>
                <Col>
                  <Text>
                    Ticket Number:{' '}
                    <Text type='secondary'>{data?.data?.ticket_number}</Text>{' '}
                  </Text>
                </Col>
                <Col>
                  <Text>
                    Booking ID :{' '}
                    <Text type='secondary'>{data?.data?.booking_id}</Text>{' '}
                  </Text>
                </Col>
                <Col>
                  <Text>
                    Flight Number :
                    <Text type='secondary'> {data?.data?.flight_number}</Text>{' '}
                  </Text>
                </Col>
              </Col>
            </Row>
          </Card>
          <Card
            size='small'
            title='Flight Segment List'
          >
            <Table
              size='small'
              dataSource={data?.data?.flight_segment}
              columns={columns}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </BasePageContainer>
  );
};

export default ViewSingleTicket;
