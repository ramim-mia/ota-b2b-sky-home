export function minutesToHoursAndMinutes(minutes: any) {
  let toNum = Number(minutes || 0);

  let hours = Math.floor(toNum / 60) || 0;

  let remainingMinutes = toNum % 60;

  return { time: `${hours}h : ${remainingMinutes}m` };
}
