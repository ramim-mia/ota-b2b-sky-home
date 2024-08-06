import { TableColumnsType } from "antd";

export interface ITraveler {
  id: number;
  booking_request_id: number;
  type: string;
  title: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  passport_number: string;
  passport_expiry_date: string;
  email: string;
  phone: string;
  frequent_flyer_airline: string;
  frequent_flyer_number: string;
  city: string;
  country_id: number;
  country_name: string;
}

export const travelerTableColumns: TableColumnsType<ITraveler> = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Date of Birth",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
  },
  {
    title: "Passport Number",
    dataIndex: "passport_number",
    key: "passport_number",
  },
  {
    title: "Passport Expiry Date",
    dataIndex: "passport_expiry_date",
    key: "passport_expiry_date",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Frequent Flyer Airline",
    dataIndex: "frequent_flyer_airline",
    key: "frequent_flyer_airline",
  },
  {
    title: "Frequent Flyer Number",
    dataIndex: "frequent_flyer_number",
    key: "frequent_flyer_number",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },

  {
    title: "Country Name",
    dataIndex: "country_name",
    key: "country_name",
  },
];
