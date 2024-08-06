export interface IFlightSearchResult {
  filter?: Filter;
  results?: Result[];
}

export interface Filter {
  carrier_operating: any;
  airlines: Airline[];
  price_rage?: PriceRage;
  total_stoppage?: number[];
}

export interface Airline {
  airline_name?: string;
  airline_logo?: string;
  carrier_marketing?: string;
}

export interface PriceRage {
  max?: number;
  min?: number;
}

export interface Result {
  flight_id?: string;
  totalPrice?: number;
  totalTaxAmount?: number;
  currency?: string;
  baseFareAmount: number;
  commissionAmount: number;
  agencyPrice: number;
  baseFareCurrency?: string;
  constructionAmount?: number;
  constructionCurrency?: string;
  equivalentAmount?: number;
  equivalentCurrency?: string;
  validatingCarrierCode?: string;
  validatingCarrierName?: string;
  ticketLastDateTime?: Date;
  legDescriptions?: LegDescription[];
  flights?: Flight[];
  passengers?: Passenger[];
}

export interface Flight {
  elapsedTime?: number;
  id?: number;
  options: Option[];
  layoverTime?: string[];
}

export interface Option {
  departure_terminal: string;
  arrival_terminal: string;
  id?: number;
  eTicketable?: boolean;
  elapsedTime?: number;
  frequency?: string;
  stopCount?: number;
  totalMilesFlown?: number;
  departure_airport?: string;
  departure_city?: string;
  departure_country?: string;
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
  departureDate?: Date;
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

export interface LegDescription {
  departureDate?: Date;
  departureLocation?: string;
  arrivalLocation?: string;
}

export interface Passenger {
  passengerType?: string;
  cabin_type?: string;
  passengerNumber?: number;
  nonRefundable?: boolean;
  bookingCode?: string;
  cabinCode?: string;
  mealCode?: string;
  seatsAvailable?: number;
  id?: number;
  pieceCount?: number;
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
  availabilityBreak?: boolean;
  weight?: number;
  unit?: string;
}

/////////////////////////////////////
export interface IFlightSearchType {
  classes: string;
  flightWay: {
    from: string;
    to: string;
    date: any;
  }[];
  passenger: {
    adults: number;
    child: number;
    infant: number;
  };
}

export interface IAirportList {
  id?: number;
  airport_country_id?: number;
  name?: string;
  iata_code?: string;
}

export interface FilterState {
  carrier_operating?: string;
  max_price?: string;
  min_price?: string;
  sort_by?: string;
  stoppage?: string;
  refundable?: string;
  page?: number;
  size?: number;
}

export interface ISearchHistoryData {
  id: number;
  search_data: {
    PassengerTypeQuantity: {
      Code: string;
      Quantity: number;
    }[];
    OriginDestinationInformation: OriginDestinationInformation[];
  };
}
export interface FlightState {
  OriginDestinationInformation: OriginDestinationInformation[];
  route?: string;
}
export interface OriginDestinationInformation {
  RPH: string;
  OriginLocation: {
    LocationCode: string;
    name?: string;
  };
  TPA_Extensions: {
    CabinPref: {
      Cabin: string;
      PreferLevel: string;
    };
  };
  DepartureDateTime: Date;
  DestinationLocation: {
    LocationCode: string;
    name?: string;
  };
}
