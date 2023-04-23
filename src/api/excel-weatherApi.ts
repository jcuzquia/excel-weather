import axios from "axios";

export const excelWeatherApi = axios.create({ baseURL: "https://developer.nrel.gov/api/" });
export const excelWeatherQueryApi = axios.create({
  baseURL: "https://developer.nrel.gov/api/solar/",
});
