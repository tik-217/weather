export default async function getCurrentPosition() {
  let lat = 0;
  let lon = 0;

  const nav = new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (e: GeolocationPosition) => res(e),
      rej
    );
  });
  nav.then((data: any) => {
    lat = data.coords.latitude;
    lon = data.coords.longitude;
  });

  return {
    lat,
    lon,
  };
}
