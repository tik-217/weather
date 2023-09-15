export function currDate() {
  const date = new Date();
  const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );

  return `${day}, ${date.getHours()}:${date.getMinutes()}`;
}