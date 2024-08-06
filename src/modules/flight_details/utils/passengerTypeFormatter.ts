export const passengerTypeFormatter = (type: string | undefined) => {
  if (type === 'ADT') return 'Adult';
  if (type === 'C11') return 'Child';
  if (type === 'INF') return 'Infant';
  return type;
};
