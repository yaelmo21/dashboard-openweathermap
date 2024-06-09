import { Country } from 'country-state-city';
const Countries = Country.getAllCountries().map((country) => ({
  label: country.name,
  value: country.isoCode,
}));
export default Countries;
