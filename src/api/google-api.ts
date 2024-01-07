import axios from "axios";

export const geocodingApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
});
