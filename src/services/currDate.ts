export function currDate(date: Date) {
  const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );

  return `${day}, ${date.toLocaleTimeString().slice(0, 5)}`;
}
