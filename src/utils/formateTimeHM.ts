export function convertTimeFormatHM(inputTime: string) {
  const timeComponents = inputTime.split(':');
  if (timeComponents.length !== 3) {
    return 'Invalid time format';
  }

  const hours = parseInt(timeComponents[0], 10);
  const minutes = parseInt(timeComponents[1], 10);

  if (isNaN(hours) || isNaN(minutes)) {
    return 'Invalid time format';
  }

  const formattedTime = `${hours}h ${minutes}m`;

  return formattedTime;
}
