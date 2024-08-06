import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckToSlot } from 'react-icons/fa6';
import { MdOutlineCancelScheduleSend } from 'react-icons/md';
import { GoIssueReopened } from 'react-icons/go';
import { RiRefund2Line } from 'react-icons/ri';

const DashboardCards = () => {
  return (
    <Row gutter={[15, 10]} className='mb-8'>
      <Col xl={6} lg={8} md={8} sm={8} xs={12}>
        <div className='dash-card'>
          <div className='amount-title'>
            <h3 className='mb-3'>0</h3>
            <p className='uppercase'>Daily Issue </p>
          </div>
          <Link
            to={'/bookingRequest'}
            style={{ color: 'rgba(255,255,255,.8)' }}
          >
            <div className='dash-card-bottom'>
              <h3 className='uppercase'>Total Ticket Issued</h3>
            </div>
          </Link>
          <div className='dash-icon'>
            <GoIssueReopened style={{ color: 'rgba(0,0,0,.15)' }} />
          </div>
        </div>
      </Col>

      <Col xl={6} lg={8} md={8} sm={8} xs={12}>
        <div className='dash-card a'>
          <div className='amount-title'>
            <h3 className='mb-3'>0</h3>
            <p className='uppercase'>Daily Booking </p>
          </div>
          <Link
            to={'/bookingRequest'}
            style={{ color: 'rgb(255 255 255 / 80%)' }}
          >
            <div className='dash-card-bottom'>
              <h3 className='uppercase'>Total Booking List</h3>
            </div>
          </Link>
          <div className='dash-icon'>
            <FaCheckToSlot style={{ color: 'rgba(0,0,0,.15)' }} />
          </div>
        </div>
      </Col>

      <Col xl={6} lg={8} md={8} sm={8} xs={12}>
        <div className='dash-card b'>
          <div className='amount-title'>
            <h3 className='mb-3'>0</h3>
            <p className='uppercase'>Daily Void </p>
          </div>
          <Link to={'/bookingRequest'} style={{ color: '#fff' }}>
            <div className='dash-card-bottom'>
              <h3 className='uppercase'>Total Daily Void</h3>
            </div>
          </Link>
          <div className='dash-icon'>
            <MdOutlineCancelScheduleSend style={{ color: 'rgba(0,0,0,.15)' }} />
          </div>
        </div>
      </Col>
      <Col xl={6} lg={8} md={8} sm={8} xs={12}>
        <div className='dash-card c'>
          <div className='amount-title'>
            <h3 className='mb-3'>0</h3>
            <p className='uppercase'>Daily Refund </p>
          </div>
          <Link to={'/agency'} style={{ color: 'rgba(255,255,255,.8)' }}>
            <div className='dash-card-bottom last'>
              <h3 className='uppercase'>Total Daily Refund</h3>
            </div>
          </Link>
          <div className='dash-icon'>
            <RiRefund2Line style={{ color: 'rgba(0,0,0,.15)' }} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DashboardCards;
