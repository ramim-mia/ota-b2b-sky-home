import { Card, Col, CountdownProps, Row, Statistic } from 'antd';
import React from 'react';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {};

const TimeCounter = (props: Props) => {
  const { Countdown } = Statistic;
  const deadline = Date.now() + 30 * 60 * 1000;
  const navigate = useNavigate();

  const onFinish: CountdownProps['onFinish'] = () => {
    // navigate('../');
  };

  return (
    <div className='bg-[#E6F4FF] p-4 rounded-sm'>
      <p className='text-center  m-0 text-[#003566] text-[17px] font-medium capitalize tracking-tight'>
        Book now before tickets run out!
      </p>
      <Row justify={'center'} align={'middle'} className='m-0'>
        <Countdown
          value={deadline}
          onFinish={onFinish}
          format='mm:ss'
          style={{ fontSize: '10px' }}
        />
      </Row>
    </div>
  );
};

export default React.memo(TimeCounter);
