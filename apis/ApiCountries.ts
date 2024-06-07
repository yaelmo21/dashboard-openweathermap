import axios from 'axios';

const ApiCountries = axios.create({
  baseURL: process.env.API_COUNTRIES_URL,
});

export default ApiCountries;
