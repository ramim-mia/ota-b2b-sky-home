export interface IFlightDetails {
  flight_id?: string;
  flights?: Flight[];
  lastTicketDate?: string;
  passengers?: Passenger[];
  totalFare?: TotalFare;
  legDescriptions?: LegDescription[];
  total_stop_count?: number;
}

export interface Flight {
  elapsedTime?: number;
  id?: number;
  options?: Option[];
  layoverTime?: string[];
}

export interface Option {
  arrival_terminal: string;
  id?: number;
  eTicketable?: boolean;
  elapsedTime?: number;
  frequency?: string;
  stopCount?: number;
  totalMilesFlown?: number;
  departureDate?: Date;
  departure_airport?: string;
  departure_city?: string;
  departure_country?: string;
  departure_terminal?: string;
  departure_time?: string;
  arrival_airport?: string;
  arrival_city?: string;
  arrival_country?: string;
  arrival_time?: string;
  carrier_equipment?: CarrierEquipment;
  carrier_marketing?: string;
  carrier_marketingFlightNumber?: number;
  carrier_operating?: string;
  carrier_operatingFlightNumber?: number;
  departureDateTime?: Date;
  arrivalDate?: Date;
  airline_name?: string;
  airline_logo?: string;
  departure_airport_name?: string;
  arrival_airport_name?: string;
  departure_city_name?: string;
  arrival_city_name?: string;
}

export interface CarrierEquipment {
  code?: string;
  typeForFirstLeg?: string;
  typeForLastLeg?: string;
}

interface departure_airport_name {
  name: string;
}
interface arrival_airport_name {
  name: string;
}

export interface LegDescription {
  departureDate?: Date;
  departureLocation?: string;
  arrivalLocation?: string;
}

export interface Passenger {
  bookingCode?: string;
  cabinCode?: string;
  cabin_type?: string;
  mealCode?: string;
  seatsAvailable?: number;
  id?: number;
  pieceCount?: number;
  passengerNumber?: number;
  totalFare?: number;
  totalTaxAmount?: number;
  currency?: string;
  baseFareAmount?: number;
  baseFareCurrency?: string;
  equivalentAmount?: number;
  equivalentCurrency?: string;
  constructionAmount?: number;
  constructionCurrency?: string;
  commissionPercentage?: number;
  commissionAmount?: number;
  exchangeRateOne?: number;
  airlineCode?: string;
  provisionType?: string;
  nonRefundable?: boolean;
  passengerType?: string;
}

export interface TotalFare {
  totalPrice?: number;
  totalTaxAmount?: number;
  currency?: string;
  baseFareAmount?: number;
  baseFareCurrency?: string;
  constructionAmount?: number;
  constructionCurrency?: string;
  equivalentAmount?: number;
  equivalentCurrency?: string;
  commissionAmount?: number;
  agencyPrice?: number;
}

export interface IPassengerDetailsApiType {
  flight_id: string;
  passengers: {
    type: string;
    reference: string;
    mid_name: string;
    sur_name: string;
    phone: string;
    date_of_birth: Date;
    gender: string;
    email: string;
    address: string;
  }[];
}
