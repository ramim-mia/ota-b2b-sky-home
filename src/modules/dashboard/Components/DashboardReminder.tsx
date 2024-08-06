import { Button, Card, Col, Divider, Row, Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { IGetDashboardReminderTypes } from '../types/dashboardType';

const DashboardReminder = () => {
  const latestReissue: IGetDashboardReminderTypes[] = [];

  const columns = [{}];

  return (
    <Row gutter={[10, 0]}>
      <Col lg={24}>
        <Card
          size='small'
          title={
            <Row
              justify={'space-between'}
              align={'middle'}
              className='py-3 px-2'
            >
              <Col className='text-base font-bold  text-[#053969] '>
                BOOKING TIME LIMIT REMINDER BOX
              </Col>

              <Link to={'/airticket'}>
                <Button type='primary'>View All</Button>
              </Link>
            </Row>
          }
        >
          <Table
            dataSource={latestReissue && latestReissue}
            columns={columns}
            pagination={false}
            size='small'
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardReminder;
