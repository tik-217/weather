export function getDayOfTheWeek(timezone: number) {
  return new Date(timezone * 1000).toDateString().slice(0, 3);
}

export function getWeatherTime(timezone: number) {
  return new Date(timezone * 1000).toTimeString().slice(0, 5);
}
