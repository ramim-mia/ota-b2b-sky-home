import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';
import { UserState } from '../type/loginType';

export const loginApiEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      HTTPResponse<UserState>,
      { email: string; password: string }
    >({
      query: (value) => ({
        url: `/btob/auth/login`,
        method: 'POST',
        body: value,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApiEndpoint;
