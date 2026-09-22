import { useState, useEffect } from 'react';
import weatherService from '../../services/weather';

export const Country = ({country}) => {
  const [weatherData, setWeatherData] = useState(null);
  const wmoCodes = {
    0: { text: "Clear Sky", day: { icon: "☀️" }, night: { icon: "🌙" } },
    1: { text: "Mainly Clear", day: { icon: "🌤️" }, night: { icon: "🌙" } },
    2: { text: "Partly Cloudy", day: { icon: "⛅" }, night: { icon: "☁️" } },
    3: { text: "Overcast", day: { icon: "☁️" }, night: { icon: "☁️" } },
    45: { text: "Foggy", day: { icon: "🌫️" }, night: { icon: "🌫️" } },
    48: { text: "Depositing Rime Fog", day: { icon: "🌫️" }, night: { icon: "🌫️" } },
    51: { text: "Light Drizzle", day: { icon: "🌦️" }, night: { icon: "🌧️" } },
    53: { text: "Moderate Drizzle", day: { icon: "🌦️" }, night: { icon: "🌧️" } },
    55: { text: "Dense Drizzle", day: { icon: "🌦️" }, night: { icon: "🌧️" } },
    56: { text: "Light Freezing Drizzle", day: { icon: "🌨️" }, night: { icon: "🌨️" } },
    57: { text: "Dense Freezing Drizzle", day: { icon: "🌨️" }, night: { icon: "🌨️" } },
    61: { text: "Slight Rain", day: { icon: "🌧️" }, night: { icon: "🌧️" } },
    63: { text: "Moderate Rain", day: { icon: "🌧️" }, night: { icon: "🌧️" } },
    65: { text: "Heavy Rain", day: { icon: "🌧️" }, night: { icon: "🌧️" } },
    66: { text: "Light Freezing Rain", day: { icon: "🌨️" }, night: { icon: "🌨️" } },
    67: { text: "Heavy Freezing Rain", day: { icon: "🌨️" }, night: { icon: "🌨️" } },
    71: { text: "Slight Snow Fall", day: { icon: "🌨️" }, night: { icon: "🌨️" } },
    73: { text: "Moderate Snow Fall", day: { icon: "❄️" }, night: { icon: "❄️" } },
    75: { text: "Heavy Snow Fall", day: { icon: "❄️" }, night: { icon: "❄️" } },
    77: { text: "Snow Grains", day: { icon: "❄️" }, night: { icon: "❄️" } },
    80: { text: "Slight Rain Showers", day: { icon: "🌦️" }, night: { icon: "🌧️" } },
    81: { text: "Moderate Rain Showers", day: { icon: "🌦️" }, night: { icon: "🌧️" } },
    82: { text: "Violent Rain Showers", day: { icon: "⛈️" }, night: { icon: "⛈️" } },
    85: { text: "Slight Snow Showers", day: { icon: "🌨️" }, night: { icon: "🌨️" } },
    86: { text: "Heavy Snow Showers", day: { icon: "❄️" }, night: { icon: "❄️" } },
    95: { text: "Thunderstorm", day: { icon: "🌩️" }, night: { icon: "🌩️" } },
    96: { text: "Thunderstorm with Slight Hail", day: { icon: "⛈️" }, night: { icon: "⛈️" } },
    99: { text: "Thunderstorm with Heavy Hail", day: { icon: "⛈️" }, night: { icon: "⛈️" } }
  };

  useEffect(() => {
    console.log('Retrieving weather information.');
    setWeatherData(null);
    weatherService
      .get(country.capitalInfo.latlng)
      .then(response => {
        console.log('Weather information retrieved.', response);
        setWeatherData(response);
      })
      .catch(error => {
        console.log('Error retrieving weather data.', error)
      });
  }, [country]);

  let conditionText = "Unknown";
  let conditionIcon = "❓";

  if (weatherData) {
    const rawCode = weatherData.current?.weather_code;
    const isDay = weatherData.current?.is_day === 1;
    const match = wmoCodes[rawCode];

    if (match) {
      conditionText = match.text;
      conditionIcon = isDay ? match.day.icon : match.night.icon;
    }
  }

  return (
    <>
      <h3>{country.name.common}</h3>
      <div><span style={{fontWeight: 'bold'}}>Official Name</span>: {country.name.official}</div>
      <div>
        <span style={{fontWeight: 'bold'}}>Capital</span>: {country.capital[0]} - Weather:
        {!weatherData ? (
          <div>Loading {country.capital[0]} weather...</div>
        ) : (
          <ul>
            <li>
              <span style={{fontWeight: 'bold'}}>Temperature</span>:{' '}
              {weatherData.current?.temperature_2m} {weatherData.current_units?.temperature_2m}
            </li>
            <li>
              <span style={{fontWeight: 'bold'}}>Wind speed</span>:{' '}
              {weatherData.current?.wind_speed_10m} {weatherData.current_units?.wind_speed_10m}
            </li>
            <li>
              <span style={{fontWeight: 'bold'}}>Weather condition</span>: {` ${conditionText} ${conditionIcon}`}
            </li>
          </ul>
        )}
      </div>
      <div><span style={{fontWeight: 'bold'}}>Area</span>: {country.area}</div>
      <div><span style={{fontWeight: 'bold'}}>Languages</span>:
        <ul>
        {Object.entries(country.languages).map(([code, name]) => (
            <li key={code}>
            <strong>{code.toUpperCase()}:</strong> {name}
            </li>
        ))}
        </ul>
      </div>
      <div><img 
        src={country.flags.png}
        alt='Flag'
      /></div>
    </>
  );
};