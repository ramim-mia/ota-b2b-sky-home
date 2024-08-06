export interface IB2CUserListType {
  id: number;
  name: string;
  email: string;
  photo: { file: string; fileList: [{ originFileObj: string }] } | undefined;
  mobile_number: string;
  status: number;
  is_verified: number;
  [key: string]: any;
}
