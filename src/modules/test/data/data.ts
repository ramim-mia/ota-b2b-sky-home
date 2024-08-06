import {
  FlightSegment,
  IAirTicketDetails,
  IAllSegmentType,
  IFareRulesType,
  IFlightsType,
  IJourneysType,
  IPaymentType,
  ITravelersDetailsType,
} from '../../airticket/type/airTicketTypes';

const flightSegment: FlightSegment[] = [
  {
    id: 1,
    airline_code: 'AA',
    arrival_time: '2024-02-19T18:30:00',
    flight_number: 'AA123',
    departure_time: '2024-02-19T14:30:00',
    origin_loc_code: 'JFK',
    flight_booking_Id: 123,
    destination_loc_code: 'LAX',
  },
  // Add more flight segments as needed
];

const travelers: ITravelersDetailsType[] = [
  {
    givenName: 'John',
    surname: 'Doe',
    type: 'adult',
    passengerCode: 'PAX123',
    emails: ['john.doe@example.com'],
    phones: [
      {
        number: '1234567890',
        label: 'mobile',
      },
    ],
    identityDocuments: [
      {
        documentType: 'passport',
        givenName: 'John',
        surname: 'Doe',
        birthDate: '1990-01-01',
        gender: 'male',
        itemId: 'ID123',
      },
    ],
  },
  {
    givenName: 'John',
    surname: 'Doe',
    type: 'adult',
    passengerCode: 'PAX123',
    emails: ['john.doe@example.com'],
    phones: [
      {
        number: '1234567890',
        label: 'mobile',
      },
    ],
    identityDocuments: [
      {
        documentType: 'passport',
        givenName: 'John',
        surname: 'Doe',
        birthDate: '1990-01-01',
        gender: 'male',
        itemId: 'ID123',
      },
    ],
  },
  // Add more travelers as needed
];

const flights: IFlightsType[] = [
  {
    itemId: 'FL123',
    confirmationId: 'CF123',
    sourceType: 'web',
    flightNumber: 123,
    airlineCode: 'AA',
    airlineName: 'American Airlines',
    operatingFlightNumber: 123,
    operatingAirlineCode: 'AA',
    operatingAirlineName: 'American Airlines',
    fromAirportCode: 'JFK',
    toAirportCode: 'LAX',
    departureDate: '2024-02-19',
    departureTime: '14:30',
    departureTerminalName: 'Terminal 1',
    departureGate: 'A1',
    arrivalDate: '2024-02-19',
    arrivalTime: '18:30',
    numberOfSeats: 1,
    cabinTypeName: 'Economy',
    cabinTypeCode: 'E',
    aircraftTypeCode: 'B738',
    aircraftTypeName: 'Boeing 737-800',
    bookingClass: 'Economy',
    meals: [
      {
        code: 'MEAL123',
        description: 'Vegetarian Meal',
      },
    ],
    flightStatusCode: 'Scheduled',
    flightStatusName: 'Scheduled',
    durationInMinutes: 240,
    distanceInMiles: 2500,
    travelerIndices: [0], // Referring to the index of the traveler in the travelers array
    identityDocuments: [
      {
        itemId: 'ID123',
        status: 'Valid',
      },
    ],
  },
  // Add more flights as needed
];

const journeys: IJourneysType[] = [
  {
    firstAirportCode: 'JFK',
    departureDate: '2024-02-19',
    departureTime: '14:30',
    lastAirportCode: 'LAX',
    numberOfFlights: 1,
  },
  // Add more journeys as needed
];

const fareRules = [
  {
    owningAirlineCode: 'AA',
    passengerCode: 'PAX123',
    isRefundable: true,
    refundPenalties: [
      {
        applicability: 'Before Departure',
        conditionsApply: false,
        penalty: {
          amount: '50',
          currencyCode: 'USD',
        },
      },
      // Add more refund penalties as needed
    ],
    isChangeable: true,
    exchangePenalties: [
      {
        applicability: 'Before Departure',
        conditionsApply: false,
        penalty: {
          amount: '25',
          currencyCode: 'USD',
        },
      },
      // Add more exchange penalties as needed
    ],
  },
  // Add more fare rules as needed
];

const allSegments: IAllSegmentType[] = [
  {
    id: 'SEG123',
    type: 'flight',
    text: 'Flight from JFK to LAX',
    vendorCode: 'AA',
    startDate: '2024-02-19',
    startTime: '14:30',
    startLocationCode: 'JFK',
    endDate: '2024-02-19',
    endTime: '18:30',
    endLocationCode: 'LAX',
  },
  // Add more segments as needed
];

const payments: IPaymentType = {
  flightTotals: [
    {
      subtotal: '500',
      taxes: '50',
      total: '550',
      currencyCode: 'USD',
    },
  ],
};

export const airTicketDetails = {
  booking_id: 123,
  pnr: 'ABC123',
  booking_status: 'pending',
  user_first_name: 'John',
  booking_created_at: '2024-02-19T12:00:00',
  ticket_issue_last_time: '2024-02-19T18:00:00',
  travelers: travelers,
  flights: flights,
  journeys: journeys,
  fareRules: fareRules,
  allSegments: allSegments,
  payments: payments,
};
