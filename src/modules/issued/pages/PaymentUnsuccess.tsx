import { Button, Result } from 'antd';
import confetti from 'canvas-confetti';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PaymentUnsuccess = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pnr = params.get('pnr');
  const description = params.get('description');

  return (
    <div>
      <Result
        status='error'
        title='Payment Failed'
        subTitle={<p className='font-bold'>PNR: {pnr}</p>}
        extra={[
          <Button type='primary' key='console'>
            <Link to={'/'}>Go to home</Link>
          </Button>,
        ]}
      >
        <div className='text-[#ff0000] text-center'>{description}</div>
      </Result>
    </div>
  );
};

export default PaymentUnsuccess;
