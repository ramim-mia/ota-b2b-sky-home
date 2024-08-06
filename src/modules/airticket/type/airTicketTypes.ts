export interface FlightSegment {
  id: number;
  airline_code: string;
  arrival_time: string;
  flight_number: string;
  departure_time: string;
  origin_loc_code: string;
  flight_booking_Id: number;
  destination_loc_code: string;
}

export interface IAirTicket {
  key?: any;
  booking_id: number;
  user_id: number;
  user_first_name?: string;
  agency_id: number;
  pnr_code: string;
  total_passenger: number;
  booking_created_at: Date;
  booking_status: 'pending' | 'cancelled' | 'adm' | 'issued' | 'refund';
  user_username: string;
  user_email: string;
  flight_segment: FlightSegment[];
}

export interface ITravelersDetailsType {
  givenName: string;
  surname: string;
  type: string;
  passengerCode: string;
  emails: string[];
  phones: [
    {
      number: string;
      label: string;
    }
  ];
  identityDocuments: [
    {
      documentType: string;
      givenName: string;
      surname: string;
      birthDate: string;
      gender: string;
      itemId: string;
    }
  ];
}

export interface IFlightsType {
  itemId: string;
  confirmationId: string;
  sourceType: string;
  flightNumber: number;
  airlineCode: string;
  airlineName: string;
  operatingFlightNumber: number;
  operatingAirlineCode: string;
  operatingAirlineName: string;
  fromAirportCode: string;
  toAirportCode: string;
  departureDate: string;
  departureTime: string;
  departureTerminalName: string;
  departureGate: string;
  arrivalDate: string;
  arrivalTime: string;
  numberOfSeats: number;
  cabinTypeName: string;
  cabinTypeCode: string;
  aircraftTypeCode: string;
  aircraftTypeName: string;
  bookingClass: string;
  meals: [
    {
      code: string;
      description: string;
    }
  ];
  flightStatusCode: string;
  flightStatusName: string;
  durationInMinutes: number;
  distanceInMiles: number;
  travelerIndices: number[];
  identityDocuments: [
    {
      itemId: string;
      status: string;
    }
  ];
}

export interface IJourneysType {
  firstAirportCode: string;
  departureDate: string;
  departureTime: string;
  lastAirportCode: string;
  numberOfFlights: number;
}
export interface IFareRulesType {
  owningAirlineCode: string;
  passengerCode: string;
  isRefundable: boolean;
  refundPenalties?: [
    {
      applicability: string;
      conditionsApply: false;
      penalty: {
        amount: string;
        currencyCode: string;
      };
    },
    {
      applicability: string;
      conditionsApply: boolean;
      penalty: {
        amount: string;
        currencyCode: string;
      };
    }
  ];
  isChangeable: boolean;
  exchangePenalties: [
    {
      applicability: string;
      conditionsApply: false;
      penalty: {
        amount: string;
        currencyCode: string;
      };
    },
    {
      applicability: string;
      conditionsApply: false;
      penalty: {
        amount: string;
        currencyCode: string;
      };
    }
  ];
}

export interface IAllSegmentType {
  id: string;
  type: string;
  text: string;
  vendorCode: string;
  startDate: string;
  startTime: string;
  startLocationCode: string;
  endDate: string;
  endTime: string;
  endLocationCode: string;
}

export interface IPaymentType {
  flightTotals: [
    {
      subtotal: string;
      taxes: string;
      total: string;
      currencyCode: string;
    }
  ];
}
export interface IAirTicketDetails {
  booking_id: number;
  pnr: string;
  booking_status: string;
  user_first_name: string;
  booking_created_at: string;
  ticket_issue_last_time: string;
  travelers: ITravelersDetailsType[];
  flights: IFlightsType[];
  journeys: IJourneysType[];
  fareRules: IFareRulesType[];
  allSegments: IAllSegmentType[];
  payments: IPaymentType;
}
