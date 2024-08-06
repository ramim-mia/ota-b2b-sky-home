import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import { FlightSegment, IFlightsType } from '../type/airTicketTypes';

const flightInformationColumn = (): ColumnsType<IFlightsType> => [
  {
    title: 'Airline Code',
    key: 'airlineCode',
    dataIndex: 'airlineCode',
  },

  {
    title: 'Departure From',
    dataIndex: 'fromAirportCode',
    key: 'fromAirportCode',
  },
  {
    title: 'Date/Time',
    key: 'departureDate',
    dataIndex: 'departureDate',
    render: (_, values) =>
      dayjs(values.departureDate).format('DD-MMM-YYYY') +
      ' ' +
      dayjs(values.departureTime, 'HH:mm:ss').format('hh:mm A'),
  },

  {
    title: 'Arrival To',
    dataIndex: 'toAirportCode',
    key: 'toAirportCode',
  },

  {
    title: 'Date/Time',
    key: 'departureDate',
    dataIndex: 'departureDate',
    render: (_, values) =>
      dayjs(values.arrivalDate).format('DD-MMM-YYYY') +
      ' ' +
      dayjs(values.arrivalTime, 'HH:mm:ss').format('hh:mm A'),
  },

  {
    title: 'No. of seat',
    key: 'numberOfSeats',
    dataIndex: 'numberOfSeats',
  },

  {
    title: 'Fare Basis',
    key: ' ',
    dataIndex: ' ',
  },
  {
    title: 'Baggage',
    key: ' ',
    dataIndex: ' ',
  },
  {
    title: 'Cabin',
    key: 'cabinTypeName',
    dataIndex: 'cabinTypeName',
  },
];

export default flightInformationColumn;
