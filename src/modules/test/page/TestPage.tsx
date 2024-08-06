import React, { useRef } from 'react';
import Header from '../Components/Header';
import BookingConfirmation from '../../airticket/component/BookingConfirmation';
import PassengerDetails from '../../airticket/component/PassengerDetails';
import FlightInformation from '../../airticket/component/FlightInformation';
import FareDertails from '../../airticket/component/FareDertails';
import { airTicketDetails } from '../data/data';
import { Button, Watermark } from 'antd';
import { useAppSelector } from '../../../utils/ReduxHook';
import logo from '../../../assets/images/logo.png';
import { PrinterOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
const TestPage = () => {
  const { travelers, payments, flights, ...bookingInfo } = airTicketDetails;
  const componentRefClient = useRef(null);

  const handleClientPrint = useReactToPrint({
    content: () => componentRefClient.current,
    documentTitle: `BookingList`,
  });

  return (
    <div>
      <Button type='primary' onClick={handleClientPrint}>
        <PrinterOutlined />
        Print
      </Button>
      <div
        ref={componentRefClient}
        style={{
          minHeight: '11.5in',
          width: '8.27in',
          fontSize: '11px',
          background: '#fff',
          margin: '0px auto',
          boxSizing: 'border-box',
          padding: '30px 25px',
          position: 'relative',
        }}
      >
        <Header />
        <div>
          <BookingConfirmation bookingInfo={bookingInfo as any} />
          <PassengerDetails
            travelers={airTicketDetails?.travelers}
            bookingInfo={bookingInfo as any}
          />
          <FlightInformation flights={airTicketDetails?.flights} />
          <FareDertails payments={airTicketDetails?.payments} />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
