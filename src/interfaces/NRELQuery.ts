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
  attribute: string;
  name: string;
  selected: boolean;
}

export const attributes: QueryAttribute[] = [
  { attribute: "air_temperature", name: "Temperature", selected: false },
  { attribute: "aod", name: "Aerosol Optical Depth", selected: false },
  { attribute: "asymmetry", name: "Aerosol Asymmetry", selected: false },
  { attribute: "cld_opd_dcomp", name: "Cloud Optical Depth", selected: false },
  { attribute: "cld_reff_dcomp", name: "Cloud Effective Radius", selected: false },
  { attribute: "alpha", name: "Angstrom Exponent", selected: false },
  { attribute: "clearsky_dhi", name: "Clear-Sky Direct Horizontal Irradiance", selected: false },
  { attribute: "clearsky_dni", name: "Clear-Sky Direct Normal Irradiance", selected: false },
  { attribute: "clearsky_ghi", name: "Clear-Sky Global Horizontal Irradiance", selected: false },
  { attribute: "cloud_type", name: "Cloud Type", selected: false },
  { attribute: "dew_point", name: "Dew Point Temperature", selected: false },
  { attribute: "fill_flag", name: "Fill Flag", selected: false },
  { attribute: "ghi", name: "Global Horizonal Irradiance", selected: false },
  { attribute: "dhi", name: "Direct Horizontal Irradiance", selected: false },
  { attribute: "dni", name: "Direct Normal Irradiance", selected: false },
  { attribute: "ozone", name: "Reduced Ozone Vertical Pathlength", selected: false },
  { attribute: "relative_humidity", name: "Relative Humidity", selected: false },
  { attribute: "solar_zenith_angle", name: "Solar Zenith Angle", selected: false },
  { attribute: "surface_albedo", name: "Surface Albedo", selected: false },
  { attribute: "ssa", name: "Single Scattering Albedo", selected: false },
  { attribute: "surface_pressure", name: "Pressure", selected: false },
  { attribute: "total_precipitable_water", name: "Precipitable Water", selected: false },
  { attribute: "wind_direction", name: "Wind Direction", selected: false },
  { attribute: "wind_speed", name: "Wind Speed", selected: false },
  { attribute: "ghuv-280-400", name: "Solar (UV) wavelengths 280-400 nanometers", selected: false },
  { attribute: "ghuv-295-385", name: "Solar (UV) wavelengths 295-385 nanometers", selected: false },
];

export const getAttribute = (attr: string) => {
  const foundAttribute = attributes.find((attribute) => attribute.attribute === attr);
  return foundAttribute;
};
