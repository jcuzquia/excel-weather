import { LatLng } from "use-places-autocomplete";

export const getUserLocation = async (): Promise<LatLng> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({ lat: coords.longitude, lng: coords.latitude });
      },
      (err) => {
        console.log(err);
        reject();
      }
    );
  });
};
