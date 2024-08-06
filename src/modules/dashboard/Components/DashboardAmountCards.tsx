import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { FaWpforms } from 'react-icons/fa6';
import { HiMiniTicket } from 'react-icons/hi2';
import { PiTicketFill } from 'react-icons/pi';
import { HiReceiptRefund } from 'react-icons/hi2';
import { GiMilitaryFort } from 'react-icons/gi';
import { GoIssueReopened } from 'react-icons/go';

const DashboardAmountCards = () => {
  return (
    <Row gutter={[10, 0]}>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} className='mb-4'>
        <div className='dash-amount-card bg-[#28a745] py-3 px-4 text-white rounded-sm shadow-md'>
          <p className='text-[15px] font-semibold mb-[10px]'>
            Daily Issue (Amount)
          </p>
          <span className='flex gap-3 items-center pb-1'>
            <GoIssueReopened className='text-[26px]' />
            <p className='text-[23px]'>0</p>
          </span>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} className='mb-4'>
        <div className='dash-amount-card bg-[#5454ab] py-3 px-4 text-white rounded-sm shadow-md'>
          <p className='text-[15px] font-semibold mb-[10px]'>
            Daily ReIssue (Amount)
          </p>
          <span className='flex gap-3 items-center pb-1'>
            <FaWpforms className='text-[26px]' />
            <p className='text-[23px]'>0 </p>
          </span>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} className='mb-4'>
        <div className='dash-amount-card bg-[#ffc107] py-3 px-4 text-white rounded-sm shadow-md'>
          <p className='text-[15px] font-semibold mb-[10px]'>
            Daily Refund (Amount)
          </p>
          <span className='flex gap-3 items-center pb-1'>
            <HiReceiptRefund className='text-[26px]' />
            <p className='text-[23px]'>0 </p>
          </span>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} className='mb-4'>
        <div className='dash-amount-card bg-[#8e23e0] py-3 px-4 text-white rounded-sm shadow-md'>
          <p className='text-[15px] font-semibold mb-[10px]'>
            Monthly Issue (Amount)
          </p>
          <span className='flex gap-3 items-center pb-1'>
            <HiMiniTicket className='text-[26px]' />
            <p className='text-[23px]'>0 </p>
          </span>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} className='mb-4'>
        <div className='dash-amount-card bg-[#9a9a9a] py-3 px-4 text-white rounded-sm shadow-md'>
          <p className='text-[15px] font-semibold mb-[10px]'>
            Monthly ReIssue (Amount)
          </p>
          <span className='flex gap-3 items-center pb-1'>
            <PiTicketFill className='text-[26px]' />
            <p className='text-[23px]'>0 </p>
          </span>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} className='mb-4'>
        <div className='dash-amount-card bg-[#3eb1ff] py-3 px-4 text-white rounded-sm shadow-md'>
          <p className='text-[15px] font-semibold mb-[10px]'>
            Monthly Refund (Amount)
          </p>
          <span className='flex gap-3 items-center pb-1'>
            <GiMilitaryFort className='text-[26px]' />
            <p className='text-[23px]'>0 </p>
          </span>
        </div>
      </Col>
    </Row>
  );
};

export default DashboardAmountCards;
