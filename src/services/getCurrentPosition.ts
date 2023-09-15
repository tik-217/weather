export default async function getCurrentPosition() {
  let lat = 0;
  let lon = 0;

  const nav = new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  }).then((data: any) => {
    console.log(data.coords.latitude, data.coords.longitude);

    lat = data.coords.latitude;
    lon = data.coords.longitude;

    return { lat, lon };
  });

  lat = (await nav).lat;
  lon = (await nav).lon;

  return {
    lat,
    lon,
  };
}
