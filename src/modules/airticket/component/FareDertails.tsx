import { Card, Divider, Table } from 'antd';
import React from 'react';
import fareDetailsColumn from '../utils/fareDetailsColumn';
import PassengerDetails from './PassengerDetails';
import { IPaymentType } from '../type/airTicketTypes';
import MiniLoading from '../../common/MiniLoading';

type IProps = {
  payments: IPaymentType | undefined;
};
const FareDertails = ({ payments }: IProps) => {
  return (
    <div>
      <div>
        <div className='flex justify-between text-sm mb-2'>
          <Divider orientation='left' plain>
            Fare Details
          </Divider>
        </div>
        <Table
          size='small'
          pagination={false}
          columns={fareDetailsColumn()}
          dataSource={payments?.flightTotals}
          className='BillingTable'
          rowClassName={'BillingTd'}
          loading={{
            spinning: payments?.flightTotals.length ? false : true,
            indicator: <MiniLoading />,
          }}
        />
      </div>
    </div>
  );
};

export default FareDertails;
