// utils/errorHandler.ts
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { message } from 'antd';

interface ErrorResponse {
  status: number;
  error?: string;
  data?: any;
}

type CustomError = ErrorResponse | FetchBaseQueryError | SerializedError;

const errorHandler = (error: CustomError): void => {
  if ('error' in error) {
    // Check if 'error' property exists
    const errMsg = error.error || JSON.stringify(error.data) || '';
    const cleanError = JSON.parse(errMsg);
    message.error(cleanError?.message || 'Something went wrong');
  } else if ('status' in error) {
    // Check if 'status' property exists
    message.error(error.data?.message || 'Something went wrong');
  }
};

export default errorHandler;
