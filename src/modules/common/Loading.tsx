import { Card, Spin } from 'antd';
import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/lottie/loading.json';
import { Typography } from 'antd/lib';

const Loading = () => {
  return (
    <div className='loader mx-auto max-w-7xl'>
      <Typography.Title level={3}>Searching Flight ...</Typography.Title>
    </div>
  );

  return (
    <div className='mx-auto max-w-6xl p-5 flex justify-center'>
      <Card className='p-5 rounded'>
        <h2 className='text-center'>Searching Flight</h2>
        <div className='w-56 h-56'>
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      </Card>
    </div>
  );

  return (
    <div className='flex flex-col gap-y-10'>
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className='border border-blue-300 shadow rounded-md p-4 max-w-7xl mx-auto'
        >
          <div className='animate-pulse flex space-x-4 w-[1100px]'>
            <div className='rounded-full bg-[#E7E7E7] h-10 w-10'></div>
            <div className='flex-1 space-y-6 py-1 w-[1000px]'>
              <div className='h-2 bg-[#E7E7E7] rounded'></div>
              <div className='space-y-3'>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='h-2 bg-[#E7E7E7] rounded col-span-2'></div>
                  <div className='h-2 bg-[#E7E7E7] rounded col-span-1'></div>
                </div>
                <div className='h-2 bg-[#E7E7E7] rounded'></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
