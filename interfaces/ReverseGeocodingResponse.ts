export interface ReverseGeocodingResponse {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface LocalNames {
  es: string;
  pl: string;
  ru: string;
  uk: string;
  en: string;
}
