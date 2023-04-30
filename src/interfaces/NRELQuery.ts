export interface NRELResponseQuery {
  errors?: string[];
  inputs?: {
    body: any;
    params: any;
    query: {
      lat: string;
      lon: string;
    };
  };
  metadata?: {
    resultset?: {
      count?: number;
    };
    version?: string;
  };
  outputs?: NRELQueryOutput[];
  status?: number;
}

export interface NRELQueryOutput {
  apiDocs?: string;
  apiUrl?: string;
  availableIntervals?: Array<number>;
  availableYears?: Array<number | string>;
  displayName?: string;
  enabled?: boolean;
  links?: Array<QueryLinkObject>;
  metadataLink?: string;
  name?: string;
  ranking?: number;
}

interface QueryLinkObject {
  year?: number;
  interval?: number;
  link?: string;
}

export interface QueryAttribute {
  parameter: string;
  name: string;
}

export const fullDiscAttributes: QueryAttribute[] = [
  { parameter: "air_temperature", name: "Temperature" },
  { parameter: "clearsky_dhi", name: "Clear-Sky Direct Horizontal Irradiance" },
  { parameter: "clearsky_dni", name: "Clear-Sky Direct Normal Irradiance" },
  { parameter: "clearsky_ghi", name: "Clear-Sky Global Horizontal Irradiance" },
  { parameter: "cloud_type", name: "Cloud Type" },
  { parameter: "dew_point", name: "Dew Point Temperature" },
  { parameter: "fill_flag", name: "Fill Flag" },
  { parameter: "ghi", name: "Global Horizonal Irradiance" },
  { parameter: "dhi", name: "Direct Horizontal Irradiance" },
  { parameter: "dni", name: "Direct Normal Irradiance" },
  { parameter: "ozone", name: "Reduced Ozone Vertical Pathlength" },
  { parameter: "relative_humidity", name: "Relative Humidity" },
  { parameter: "solar_zenith_angle", name: "Solar Zenith Angle" },
  { parameter: "surface_albedo", name: "Surface Albedo" },
  { parameter: "surface_pressure", name: "Pressure" },
  { parameter: "total_precipitable_water", name: "Precipitable Water" },
  { parameter: "wind_direction", name: "Wind Direction" },
  { parameter: "wind_speed", name: "Wind Speed" },
];
