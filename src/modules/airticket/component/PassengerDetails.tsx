import { Alert, Card, Col, Divider, Row, Table } from 'antd';
import React from 'react';
import { IAirTicket, ITravelersDetailsType } from '../type/airTicketTypes';
import MiniLoading from '../../common/MiniLoading';
import travelerDetailsColumn from '../utils/travelerDetailsColumn';

type IProps = {
  travelers: ITravelersDetailsType[] | undefined;
  bookingInfo: IAirTicket;
};
const PassengerDetails = ({ travelers, bookingInfo }: IProps) => {
  return (
    <div className='mb-2'>
      <div>
        <div className='flex justify-between text-lg mb-2'>
          <Divider orientation='left' plain>
            Passenger Details
          </Divider>
        </div>
        <div>
          {travelers?.length ? (
            <Table
              size='small'
              pagination={false}
              columns={travelerDetailsColumn()}
              dataSource={travelers}
              className='BillingTable'
              rowClassName={'BillingTd'}
            />
          ) : (
            <MiniLoading />
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
