import { SOURCES, WEATHER_CONDITIONS } from '../utils/constants';

/**
 * Generates realistic mock weather data for each API source.
 * Data varies slightly between sources to simulate real differences.
 */

// Base weather scenarios for each city
const cityBaseWeather = {
  tokyo: {
    temperature: 18,
    humidity: 62,
    precipitation: 25,
    windSpeed: 4.5,
    condition: WEATHER_CONDITIONS.CLOUDY,
    description: '曇り時々晴れ',
  },
  osaka: {
    temperature: 20,
    humidity: 58,
    precipitation: 10,
    windSpeed: 3.2,
    condition: WEATHER_CONDITIONS.CLEAR,
    description: '晴れ',
  },
  nagoya: {
    temperature: 17,
    humidity: 65,
    precipitation: 40,
    windSpeed: 5.1,
    condition: WEATHER_CONDITIONS.RAIN,
    description: '小雨',
  },
  sapporo: {
    temperature: 5,
    humidity: 72,
    precipitation: 55,
    windSpeed: 6.8,
    condition: WEATHER_CONDITIONS.SNOW,
    description: '雪',
  },
  fukuoka: {
    temperature: 21,
    humidity: 55,
    precipitation: 5,
    windSpeed: 2.9,
    condition: WEATHER_CONDITIONS.CLEAR,
    description: '快晴',
  },
};

/**
 * Add slight variation to simulate differences between sources
 */
function addVariation(base, seed) {
  const variation = (seed % 5) - 2; // -2 to +2
  return {
    temperature: base.temperature + variation,
    feelsLike: base.temperature + variation - 2,
    humidity: Math.max(0, Math.min(100, base.humidity + variation * 3)),
    precipitation: Math.max(0, Math.min(100, base.precipitation + variation * 5)),
    windSpeed: Math.max(0, +(base.windSpeed + variation * 0.5).toFixed(1)),
    condition: base.condition,
    description: base.description,
  };
}

/**
 * Generate OpenWeatherMap-style mock response
 */
export function getMockOpenWeatherMap(cityId) {
  const base = cityBaseWeather[cityId];
  if (!base) return null;
  const data = addVariation(base, 1);
  const now = new Date().toISOString();

  return {
    source: SOURCES.OPEN_WEATHER_MAP,
    city: getCityName(cityId),
    temperature: data.temperature,
    feelsLike: data.feelsLike,
    humidity: data.humidity,
    precipitation: data.precipitation,
    windSpeed: data.windSpeed,
    weatherCondition: data.condition,
    weatherDescription: data.description,
    icon: data.condition,
    forecastDate: new Date().toISOString().split('T')[0],
    updatedAt: now,
  };
}

/**
 * Generate WeatherAPI-style mock response
 */
export function getMockWeatherAPI(cityId) {
  const base = cityBaseWeather[cityId];
  if (!base) return null;
  const data = addVariation(base, 3);
  const now = new Date().toISOString();

  return {
    source: SOURCES.WEATHER_API,
    city: getCityName(cityId),
    temperature: data.temperature,
    feelsLike: data.feelsLike,
    humidity: data.humidity,
    precipitation: data.precipitation,
    windSpeed: data.windSpeed,
    weatherCondition: data.condition,
    weatherDescription: data.description,
    icon: data.condition,
    forecastDate: new Date().toISOString().split('T')[0],
    updatedAt: now,
  };
}

/**
 * Generate JMA-style mock response
 */
export function getMockJMA(cityId) {
  const base = cityBaseWeather[cityId];
  if (!base) return null;
  const data = addVariation(base, 5);
  const now = new Date().toISOString();

  return {
    source: SOURCES.JMA,
    city: getCityName(cityId),
    temperature: data.temperature,
    feelsLike: data.feelsLike,
    humidity: data.humidity,
    precipitation: data.precipitation,
    windSpeed: data.windSpeed,
    weatherCondition: data.condition,
    weatherDescription: data.description,
    icon: data.condition,
    forecastDate: new Date().toISOString().split('T')[0],
    updatedAt: now,
  };
}

function getCityName(cityId) {
  const names = {
    tokyo: '東京',
    osaka: '大阪',
    nagoya: '名古屋',
    sapporo: '札幌',
    fukuoka: '福岡',
  };
  return names[cityId] || cityId;
}
