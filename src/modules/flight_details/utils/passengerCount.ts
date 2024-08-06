import { IPassenger } from '../../flightSearchNew/types/TypeFlight';

export type IPaxCountTypes = {
  passengerQuantity: {
    adult: number;
    child: number;
    infant: number;
    kids: number;
  };
};

export const passengerCount = (
  flightPassengers?: IPassenger[]
): IPaxCountTypes['passengerQuantity'] => {
  const passengerData = flightPassengers;

  const passengers = {
    adult: 0,
    child: 0,
    infant: 0,
    kids: 0
  };

  passengerData?.forEach((pax: IPassenger) => {
    switch (pax.type) {
      case 'ADT':
        passengers.adult += pax?.number || 0;
        break;
      case 'C11':
        passengers.child += pax?.number || 0;
        break;
      case 'INF':
        passengers.infant += pax?.number || 0;
        break;
      case 'C05':
        passengers.kids += pax?.number || 0;
        break;
      default:
        break;
    }
  });
  return passengers;
};
