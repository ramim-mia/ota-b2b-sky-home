import { Option } from '../modules/flightSearchNew/types/flightSearchType';

export const findAirportsWithBreaks = (flights: Option[]): string => {
  const airportsWithBreaks = [];
  let currentAirport: string | undefined = flights[0]?.departure_airport;
  let lastAirport: string | undefined =
    flights[flights.length - 1]?.arrival_airport;

  if (flights.length === 0) {
    return '';
  }

  for (const flight of flights) {
    airportsWithBreaks.push(flight.arrival_airport);
    currentAirport = flight.arrival_airport;

    if (lastAirport === airportsWithBreaks[airportsWithBreaks.length - 1]) {
      airportsWithBreaks.pop();
    }
  }

  return airportsWithBreaks.join(', ');
};
