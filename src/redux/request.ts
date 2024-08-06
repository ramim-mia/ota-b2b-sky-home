import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`,
});
export const imgHostLink =
  'https://m360ict.s3.ap-south-1.amazonaws.com/ota-files';
