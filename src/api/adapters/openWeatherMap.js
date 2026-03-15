import { getMockOpenWeatherMap } from '../mockData';

const USE_MOCK = true; // Set to false when real API key is available
const API_KEY = ''; // Add your OpenWeatherMap API key here

/**
 * OpenWeatherMap API Adapter
 * Fetches weather data from OpenWeatherMap and normalizes it to the unified format.
 */
export async function fetchOpenWeatherMap(city) {
  if (USE_MOCK || !API_KEY) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
    return getMockOpenWeatherMap(city.id);
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=ja`
    );
    const data = await response.json();

    return {
      source: 'OpenWeatherMap',
      city: city.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      precipitation: data.rain ? 100 : (data.clouds?.all > 70 ? 60 : 10),
      windSpeed: data.wind.speed,
      weatherCondition: mapOWMCondition(data.weather[0].id),
      weatherDescription: data.weather[0].description,
      icon: mapOWMCondition(data.weather[0].id),
      forecastDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date(data.dt * 1000).toISOString(),
    };
  } catch (error) {
    console.error('OpenWeatherMap fetch error:', error);
    return getMockOpenWeatherMap(city.id); // Fallback to mock
  }
}

function mapOWMCondition(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return 'storm';
  if (weatherId >= 300 && weatherId < 600) return 'rain';
  if (weatherId >= 600 && weatherId < 700) return 'snow';
  if (weatherId === 800) return 'clear';
  return 'cloudy';
}
