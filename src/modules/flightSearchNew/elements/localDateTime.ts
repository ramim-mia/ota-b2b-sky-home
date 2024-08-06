export const formatFlightDateTime = (timestamp: any) => {
  const isoDate = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return isoDate.toLocaleDateString('en-US', options);
};
