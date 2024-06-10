import { City } from 'country-state-city';
export const getCitiesOfState = (countryCode: string, stateCode: string) => {
  const cities = City.getCitiesOfState(countryCode, stateCode).map((city) => ({
    label: city.name,
    value: city.name,
  }));
  return cities;
};

export const getCityByName = (
  countryCode: string,
  stateCode: string,
  cityName: string,
) => {
  const city = City.getCitiesOfState(countryCode, stateCode).find((city) =>
    city.name.toLowerCase().includes(cityName.toLowerCase()),
  );
  if (!city) return null;
  return city;
};
