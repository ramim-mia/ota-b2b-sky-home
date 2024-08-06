import React from 'react';
import { useAppSelector } from '../../../utils/ReduxHook';
import BookingConfirmation from '../../airticket/component/BookingConfirmation';
import PassengerDetails from '../../airticket/component/PassengerDetails';
import FlightInformation from '../../airticket/component/FlightInformation';
import FareDertails from '../../airticket/component/FareDertails';

const Header = () => {
  const user = useAppSelector((state) => state?.user);

  // const info = user?.organization_info;
  return (
    <div>
      {/* <div
        style={{
          position: 'absolute',
          top: '30%',
          left: 0,
          pointerEvents: 'none',
          fontSize: 150,
          opacity: 0.05,
          zIndex: 9,
          userSelect: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '8in',
            justifyContent: 'center',
          }}
        >
          <img
            src={info?.org_logo}
            alt={info?.org_name}
            style={{ maxWidth: 600, userSelect: 'none' }}
          />
        </div>
      </div>

      <div className='mb-16'>
        <div className='flex items-center justify-between'>
          <div className='logo'>
            <img
              className='object-contain w-40'
              style={{ minHeight: '50px' }}
              src={info?.org_logo}
              alt='Header Logo'
            />
          </div>
          <div className='content'>
            <h2 className='mb-2'>{info?.org_name}</h2>
            <p className='text-[13px] mb-1'>Address: {info?.org_address1}</p>
            <p className='text-[13px] mb-1'>Mobile: {info?.org_mobile}</p>
            <p className='text-[13px]'>Email: {info?.org_owner_email}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
