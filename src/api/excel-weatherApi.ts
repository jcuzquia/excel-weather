import axios from "axios";

const excelWeatherApi = axios.create({ baseURL: "https://developer.nrel.gov/api/" });

export default excelWeatherApi;
