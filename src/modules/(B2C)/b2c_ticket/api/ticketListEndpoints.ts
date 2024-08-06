import { TICKETLIST } from '../../../../constants/TagType';
import { api } from '../../../../redux/api/api';
import { HTTPResponse } from '../../../common/commonType';
import { ITicketList } from '../types/ticketListTypes';

export const ticketListEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTicketList: build.query<HTTPResponse<ITicketList[]>, string>({
      query: (url) => ({
        url: url,
      }),
      providesTags: () => [TICKETLIST],
    }),

    getSingleTicketDetails: build.query<HTTPResponse<any>, string>({
      query: (arg) => ({
        url: `/btob/btoc-user/ticket/${arg}`,
      }),
      providesTags: () => [TICKETLIST],
    }),
  }),
});

export const { useLazyGetAllTicketListQuery, useGetSingleTicketDetailsQuery } =
  ticketListEndpoints;
