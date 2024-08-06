export interface UserState {
  ref_id?: number | null | string | undefined;
  id?: number | null;
  name?: string | null;
  email?: string | null;
  mobile_number?: string | null;
  photo?: string | null;
  status?: number | null;
  created_at?: Date | null;
  agency_id?: number | null;
  agency_name?: string | null;
  agency_status?: number | null;
  agency_logo?: string | null;
  token?: string | null;
  btoc_commission?: string | null;
}
