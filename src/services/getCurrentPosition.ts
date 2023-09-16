export default async function getCurrentPosition() {
  let lat = 0;
  let lon = 0;

  const nav = new Promise<GeolocationPosition>((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (data: GeolocationPosition) => res(data),
      rej
    );
  }).catch((err) => {
    if (err.PERMISSION_DENIED) {
      console.log("Permission denied.");
    }
  });

  lat = await nav.then((position) => {
    if (position) {
      return position.coords.latitude;
    } else {
      return 0;
    }
  });

  lon = await nav.then((position) => {
    if (position) {
      return position.coords.longitude;
    } else {
      return 0;
    }
  });

  return {
    lat,
    lon,
  };
}
