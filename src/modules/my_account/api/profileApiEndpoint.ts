import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';

type updateResponse = {
  photo?: string;
};

export const profileApiEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<HTTPResponse<updateResponse>, FormData>({
      query: (body) => ({
        url: `/btob/profile`,
        method: 'PATCH',
        body: body,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApiEndpoint;
