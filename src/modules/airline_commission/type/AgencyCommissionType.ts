export interface IGetAgencyCommission {
  domestic_commission?: string;
  airline_code?: string;
  airline_name?: string;
  airline_logo?: string;
  capping?: number;
  from_dac_commission?: string;
  to_dac_commission?: string;

  soto_commission?: string;
  siti_commission?: string;
  soto_allowed?: number;
  last_updated?: null;
  updated_by?: string;
}

export interface IBodyAgencyCommission {
  airline_code?: string;
  soto_commission?: number;
  siti_commission?: number;
  soto_allowed?: number;
  capping?: number;
}
