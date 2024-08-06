import { PNR } from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';
import {
  ITicketIssued,
  IViewIssueTicketType,
} from '../types/ticketIssuedTypes';

export const ticketIssuedEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getTicketIssuedList: build.query<HTTPResponse<ITicketIssued[]>, string>({
      query: (url) => ({
        url: url,
      }),
      providesTags: () => [PNR],
    }),

    getSingleTicketIssueDetails: build.query<
      HTTPResponse<IViewIssueTicketType>,
      string
    >({
      query: (arg) => ({
        url: `/btob/ticket-issue/${arg}`,
      }),
      providesTags: () => [PNR],
    }),
  }),
});

export const {
  useLazyGetTicketIssuedListQuery,
  useGetSingleTicketIssueDetailsQuery,
} = ticketIssuedEndpoints;
