export function getTime(timezone: number) {
  return new Date(timezone * 1000).toTimeString().slice(0, 5);
}

export function getDayOfTheWeek(timezone: number) {
  return new Date(timezone * 1000).toDateString().slice(0, 3);
}

export function getDate(timezone: number) {
  return new Date(timezone * 1000).toLocaleDateString().slice(0, 5);
}
