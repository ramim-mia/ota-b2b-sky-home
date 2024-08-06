import dayjs from 'dayjs';
import { ISearchHistoryData } from '../types/flightSearchType';

export const searchHistoryReformate = (history: ISearchHistoryData) => {
  const passengerTypeQuantity: { Code: string; Quantity: number }[] = [];
  const formateData = history?.search_data?.OriginDestinationInformation?.map(
    (item) => {
      return {
        from: item.OriginLocation.LocationCode,
        from_name: item.OriginLocation.name,
        to: item.DestinationLocation.LocationCode,
        to_name: item.DestinationLocation.name,
        date: dayjs(item.DepartureDateTime),
      };
    }
  );
  history?.search_data?.PassengerTypeQuantity?.map((item) => {
    if (item.Code === 'ADT') {
      passengerTypeQuantity.push(item);
    } else if (item.Code === 'C11') {
      passengerTypeQuantity.push(item);
    } else if (item.Code === 'INF') passengerTypeQuantity.push(item);
  });
  return {
    passengerTypeQuantity,
    cabin:
      history?.search_data?.OriginDestinationInformation[0]?.TPA_Extensions
        .CabinPref.Cabin,
    OriginDestinationInformation: formateData,
  };
};
