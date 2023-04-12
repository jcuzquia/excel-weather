export interface NRELQuery {
  errors: string[];
  inputs: {
    wkt: string;
  };
  outputs: Outputs[];
}

export interface Outputs {
  apiDocs: string;
  availableYears: (string | number)[];
  availableIntervals: number[];
  displayName: string;
  metadataLink: string;
  name: string;
  type: string;
  links: NRELLink[];
}

export interface NRELLink {
  year: string | number;
  interval: number;
  link: string;
}
