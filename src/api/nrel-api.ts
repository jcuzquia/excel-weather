import axios from "axios";

export const nrelTestApi = axios.create({ baseURL: "https://developer.nrel.gov/api/" });
export const weatherQueryApi = axios.create({
  baseURL: "https://developer.nrel.gov/api/solar/",
});
