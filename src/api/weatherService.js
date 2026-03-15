import { fetchOpenWeatherMap } from './adapters/openWeatherMap';
import { fetchWeatherAPI } from './adapters/weatherApi';
import { fetchJMA } from './adapters/jma';

/**
 * Weather Service — Unified data fetching from all sources
 * Fetches data from all APIs in parallel and returns an array of UnifiedWeatherData.
 */

const adapters = [
  { name: 'OpenWeatherMap', fetch: fetchOpenWeatherMap },
  { name: 'WeatherAPI', fetch: fetchWeatherAPI },
  { name: '気象庁', fetch: fetchJMA },
];

/**
 * Fetch weather data from all sources for a given city
 * @param {Object} city - City object from CITIES constant
 * @returns {Promise<Array>} Array of UnifiedWeatherData objects
 */
export async function fetchAllWeatherData(city) {
  const results = await Promise.allSettled(
    adapters.map(adapter => adapter.fetch(city))
  );

  return results
    .filter(result => result.status === 'fulfilled' && result.value !== null)
    .map(result => result.value);
}

/**
 * Fetch weather data from a specific source
 * @param {string} sourceName - Name of the source
 * @param {Object} city - City object
 * @returns {Promise<Object|null>} UnifiedWeatherData or null
 */
export async function fetchWeatherBySource(sourceName, city) {
  const adapter = adapters.find(a => a.name === sourceName);
  if (!adapter) return null;

  try {
    return await adapter.fetch(city);
  } catch (error) {
    console.error(`Error fetching from ${sourceName}:`, error);
    return null;
  }
}
