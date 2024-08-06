import { Button, Result } from 'antd';
import confetti from 'canvas-confetti';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pnr = params.get('pnr');

  const fireConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    const fire = (particleRatio: any, opts: any) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div>
      <Result
        status='success'
        title='Successfully Payment Received!'
        subTitle={<p className='font-bold'>PNR: {pnr}</p>}
        extra={[
          <Button type='primary' key='console'>
            <Link to={'/'}>Go to Home</Link>
          </Button>,
        ]}
      >
        <div className='text-center '>
          The ticket has been sent to your email. Please check it.
        </div>
      </Result>
    </div>
  );
};

export default PaymentSuccess;
