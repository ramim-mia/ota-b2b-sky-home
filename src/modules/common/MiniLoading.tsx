import React from 'react';

const MiniLoading = () => {
  return (
    <div className='bg-bgMuted  flex justify-center items-center w-full'>
      <div className='animate-pulse '>
        <div className='space-x-2'>
          <div
            aria-label='Loading...'
            role='status'
          >
            <svg
              style={{ width: '40px', height: '40px' }}
              width={54}
              height={54}
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              viewBox='0 0 24 24'
              strokeLinecap='round'
              strokeLinejoin='round'
              xmlns='http://www.w3.org/2000/svg'
              className='animate-spin w-4 h-4 stroke-slate-500'
            >
              <path d='M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12' />
            </svg>
          </div>
          <span className='font-medium text-slate-500'></span>
        </div>
      </div>
    </div>
  );
};

export default MiniLoading;
