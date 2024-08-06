export interface IGetAgency {
  id?: number;
  agency_name?: string;
  commission?: string;
  logo?: string;
  email?: string;
  status?: number;
}
export interface IGetSingleAgency {
  id?: number;
  agency_name?: string;
  logo?: string;
  email?: string;
  status?: number;
  phone?: string;
  created_at?: Date;
  commission?: string;
  reference?: Reference;
  users?: IGetSingleAgencyUser[];
  btocToken?: BtocToken[];
}

export interface BtocToken {
  id?: number;
  agency_id?: number;
  token?: string;
  status?: number;
  created_at?: Date;
  agency_name?: string;
}

export interface Reference {
  id?: number;
  agency_name?: string;
  agency_logo?: string;
}

export interface IGetSingleAgencyUser {
  id?: number;
  name?: string;
  email?: string;
  mobile_number?: string;
  photo?: string;
  status?: number;
  created_at?: Date;
  agency_id?: number;
  agency_name?: string;
  agency_logo?: string;
}
