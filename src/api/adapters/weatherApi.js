import { getMockWeatherAPI } from '../mockData';

const USE_MOCK = true; // Set to false when real API key is available
const API_KEY = ''; // Add your WeatherAPI key here

/**
 * WeatherAPI Adapter
 * Fetches weather data from WeatherAPI.com and normalizes it to the unified format.
 */
export async function fetchWeatherAPI(city) {
  if (USE_MOCK || !API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 500));
    return getMockWeatherAPI(city.id);
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.lat},${city.lon}&lang=ja`
    );
    const data = await response.json();

    return {
      source: 'WeatherAPI',
      city: city.name,
      temperature: Math.round(data.current.temp_c),
      feelsLike: Math.round(data.current.feelslike_c),
      humidity: data.current.humidity,
      precipitation: data.current.cloud > 70 ? 60 : 10,
      windSpeed: +(data.current.wind_kph / 3.6).toFixed(1),
      weatherCondition: mapWeatherAPICondition(data.current.condition.code),
      weatherDescription: data.current.condition.text,
      icon: mapWeatherAPICondition(data.current.condition.code),
      forecastDate: new Date().toISOString().split('T')[0],
      updatedAt: data.current.last_updated,
    };
  } catch (error) {
    console.error('WeatherAPI fetch error:', error);
    return getMockWeatherAPI(city.id);
  }
}

function mapWeatherAPICondition(code) {
  if (code === 1000) return 'clear';
  if (code >= 1003 && code <= 1009) return 'cloudy';
  if (code >= 1063 && code <= 1207) return 'rain';
  if (code >= 1210 && code <= 1264) return 'snow';
  if (code >= 1273) return 'storm';
  return 'cloudy';
}
