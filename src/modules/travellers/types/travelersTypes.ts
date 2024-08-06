export interface IAllTravelers {
  id?: string
  type: "ADT" | "INF" | "C02" | "C03" | "C04" | "C05" | "C06" | "C07" | "C08" | "C09" | "C10" | "C11";
  title: "MISS" | "MASTER" | "MS" | "MR" | "MRS";
  first_name: string;
  last_name: string;
  reference?: string;
  sur_name?: string; // Added sur_name field
  date_of_birth: string; // Format: YYYY-MM-DD
  passport_number: string; // Required if traveling outside the country
  passport_expiry_date: string; // Required if traveling outside the country and must have at least 6 months validity from the date of departure
  country_id: string | number;
  // passport_expire_date?:string;
  city: string;
  email: string;
  phone: string;
  frequent_flyer_airline?: string; // Optional
  frequent_flyer_number?: string; // Optional
}