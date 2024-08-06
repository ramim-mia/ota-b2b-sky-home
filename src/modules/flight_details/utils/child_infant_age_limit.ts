import dayjs, { Dayjs } from 'dayjs';

export const getDisabledDateRange = (type: string) => {
  const today = dayjs();
  if (type === 'ADT') {
    const maxDate = today.subtract(11, 'year');
    return { minDate: today.subtract(150, 'year'), maxDate };
  } else if (type === 'child') {
    const maxDate = today.subtract(2, 'year');
    const minDate = today.subtract(11, 'year');
    return { minDate, maxDate };
  } else if (type === 'INF') {
    const maxDate = today;
    const minDate = today.subtract(2, 'year');
    return { minDate, maxDate };
  }
  return { minDate: today, maxDate: today }; // Default case
};

export const disabledDate = (current: Dayjs | null, type: string) => {
  if (!current) {
    return false;
  }
  const { minDate, maxDate } = getDisabledDateRange(type);
  return current.isBefore(minDate) || current.isAfter(maxDate);
};
