export const formatFlightDateTime = (timestamp: any) => {
  const isoDate = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return isoDate.toLocaleDateString('en-US', options);
};

export const localTime = (timestamp: any) => {
  const isoDate = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  return isoDate.toLocaleTimeString('en-US', options);
};
