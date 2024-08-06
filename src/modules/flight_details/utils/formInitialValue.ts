import dayjs from 'dayjs';
import { passengerCount } from './passengerCount';

export const formInitialValue = () => {
  let initialValues: any = {};
  let totalPassengerCounts = 0;
  const passengers = passengerCount();
  for (const [type, count] of Object.entries(passengers)) {
    totalPassengerCounts += count;
    for (
      let i = totalPassengerCounts - count + 1;
      i <= totalPassengerCounts;
      i++
    ) {
      initialValues[`${type}-${i}-dateOfBirth`] =
        type === 'adult'
          ? dayjs().subtract(11, 'years')
          : type === 'child'
          ? dayjs().subtract(2, 'years')
          : type === 'infant'
          ? dayjs()
          : undefined;
    }
  }
  return initialValues;
};
