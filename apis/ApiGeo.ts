import axios from 'axios';

const ApiGeo = axios.create({
  baseURL: process.env.API_GEO_URL,
  params: {
    appid: process.env.API_OPENWEATHERMAP_API_KEY,
  },
});

export default ApiGeo;
