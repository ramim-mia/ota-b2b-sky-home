export interface IFare {
  commission: number;
  base_fare: number;
  discount: number;
  ait: number;
  payable: number;
  total_price: number;
  total_tax: number;
}

export interface IRefundable {
  type: string;
  refundable: boolean;
}

export interface IFlightClass {
  type: string;
  booking_code: string;
  cabin_type: string;
}

export interface ILegDescription {
  departureDate: string;
  departureLocation: string;
  arrivalLocation: string;
}

export interface IDeparture {
  airport_code: string;
  city_code: string;
  airport: string;
  city: string;
  country: string;
  terminal: string;
  time: string;
  date: string;
}

export interface Arrival extends IDeparture { }

export interface ICarrier {
  carrier_marketing_code: string;
  carrier_marketing_airline: string;
  carrier_marketing_logo: string;
  carrier_marketing_flight_number: number;
  carrier_operating_code: string;
  carrier_operating_airline: string;
  carrier_operating_logo: string;
  carrier_operating_flight_number: number;
  carrier_aircraft_code: string;
  carrier_aircraft_name: string;
}

export interface IOption {
  id: number;
  e_ticketable: boolean;
  elapsedTime: number;
  stopCount: number;
  total_miles_flown: number;
  departure: IDeparture;
  arrival: Arrival;
  carrier: ICarrier;
}

export interface IFlightDetail {
  stoppage: number;
  id: number;
  elapsed_time: number;
  options: IOption[];
  layover_time?: string[];
}

export interface IBaggage {
  id: number;
  weight: number;
  unit: string;
}


// export interface IPassengerFare {
//   total_fare: number;
//   tax: number;
//   base_fare: number;
// };
// export interface IPassenger {
//   type: string;
//   number: number;
//   non_refundable: boolean;
//   baggage: IBaggage;
//   meal_code: string;
//   meal_type: string;
//   cabin_code: string;
//   cabin_type: string;
//   booking_code: string;
//   fare: IPassengerFare;
// }


// ! new update 

export interface ISegment {
  id: number;
  name?: string;
  meal_type?: string;
  meal_code?: string;
  cabin_code: string;
  cabin_type: string;
  booking_code: string;
  available_seat: number;
  available_break: boolean;
  available_fare_break?: boolean;
}

export interface IPBaggage {
  id: number;
  unit: string;
  count: number;
}

export interface IAvailability {
  id: number;
  from_airport: string;
  to_airport: string;
  segments: ISegment[];
  baggage: IPBaggage;
}

export interface IPFare {
  total_fare: number;
  tax: number;
  base_fare: number;
}

export interface IPassenger {
  type: string;
  number: number;
  non_refundable: boolean;
  availability: IAvailability[];
  fare: IPFare;
}

export interface IFlight {
  flight_id: string;
  fare: IFare;
  refundable: IRefundable[];
  flight_class: IFlightClass[];
  carrier_code: string;
  carrier_name: string;
  carrier_logo: string;
  ticket_last_date: string;
  leg_descriptions: ILegDescription[];
  flights: IFlightDetail[];
  passengers: IPassenger[];
  results?: IFlight[]
}

export interface Airline {
  airline_code: string;
  price: number;
  airline_logo: string,
  airline_name: string,
}

export interface PriceRange {
  max: number;
  min: number;
}

export interface FlightFilter {
  total_stoppage: number[];
  price_rage: PriceRange;
  airlines: Airline[];
}

export interface TFlightData {
  filter: FlightFilter;
  results: IFlight[];

}