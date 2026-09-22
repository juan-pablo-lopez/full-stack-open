import axios from 'axios';
const baseUrl = 'https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m,is_day';

const get = (coordinates) => {
  return axios.get(`${baseUrl}&latitude=${coordinates[0]}&longitude=${coordinates[1]}`).then(response => response.data);
};

export default { 
  get
}