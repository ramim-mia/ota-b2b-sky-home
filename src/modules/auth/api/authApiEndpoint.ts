import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';

export type SendOTP = {
  email?: string;
  type?: string;
};
export type matchOtp = {
  email?: string;
  otp?: string;
  type?: string;
};
export type resetPassword = {
  token?: string | null;
  password?: string;
};

export const authApiEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<HTTPResponse<{ email: string }>, SendOTP>({
      query: (value) => ({
        url: `/public/otp/send`,
        method: 'POST',
        body: value,
      }),
    }),
    matchOtp: builder.mutation<HTTPResponse<void>, matchOtp>({
      query: (value) => ({
        url: `/public/otp/match`,
        method: 'POST',
        body: value,
      }),
    }),
    resetPassword: builder.mutation<HTTPResponse<void>, resetPassword>({
      query: (value) => ({
        url: `/btob/auth/reset-password`,
        method: 'POST',
        body: value,
      }),
    }),
    changePassword: builder.mutation<
      HTTPResponse<void>,
      { old_password: string; new_password: string }
    >({
      query: (body) => ({
        url: `/btob/profile/change-password`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useMatchOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApiEndpoint;
