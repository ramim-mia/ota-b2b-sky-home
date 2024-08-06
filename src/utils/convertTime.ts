import dayjs from 'dayjs';
import moment from 'moment-timezone';

export function convertTime(timeString: any) {
  if (!timeString) return 'No time found';
  const timeOnly = timeString.substring(0, 5);
  return timeOnly;
}

export function formatFlightDateTime(DateTimeString: any) {
  if (!DateTimeString) return 'No time found';
  const formattedDate = moment.utc(DateTimeString);
  return formattedDate.format('ddd D MMM YYYY');
}
