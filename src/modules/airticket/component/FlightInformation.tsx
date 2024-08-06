import { Card, Divider, Table } from 'antd';
import React from 'react';
import flightInformationColumn from '../utils/flightInformationColumn';
import { FlightSegment, IFlightsType } from '../type/airTicketTypes';
import MiniLoading from '../../common/MiniLoading';

type IProps = {
  flights: IFlightsType[] | undefined;
};
const FlightInformation = ({ flights }: IProps) => {
  return (
    <div className='mb-2'>
      <div className='flex justify-between text-sm mb-2'>
        <Divider orientation='left' plain>
          Flight Information
        </Divider>
      </div>
      <Table
        size='small'
        columns={flightInformationColumn()}
        dataSource={flights}
        pagination={false}
        className='BillingTable'
        rowClassName={'BillingTd'}
        loading={{
          spinning: flights?.length ? false : true,
          indicator: <MiniLoading />,
        }}
      />
    </div>
  );
};

export default FlightInformation;
