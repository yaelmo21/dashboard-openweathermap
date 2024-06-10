import axios from 'axios';

const ApiOpenWeatherMap = axios.create({
  baseURL: process.env.API_OPENWEATHERMAP_URL,
  params: {
    appid: process.env.API_OPENWEATHERMAP_API_KEY,
    lang: 'es',
  },
});

export default ApiOpenWeatherMap;
