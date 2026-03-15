import { getMockJMA } from '../mockData';

const USE_MOCK = true; // Set to false to use real JMA data

/**
 * JMA (気象庁) API Adapter
 * Fetches weather data from JMA's public API and normalizes it to the unified format.
 * Note: JMA API doesn't require an API key but has a non-standard response format.
 */
export async function fetchJMA(city) {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));
    return getMockJMA(city.id);
  }

  try {
    const areaCode = getJMAAreaCode(city.id);
    if (!areaCode) return getMockJMA(city.id);

    const response = await fetch(
      `https://www.jma.go.jp/bosai/forecast/data/forecast/${areaCode}.json`
    );
    const data = await response.json();

    const forecast = data[0];
    const today = forecast.timeSeries[0].areas[0];
    const tempData = forecast.timeSeries[2]?.areas[0];

    return {
      source: '気象庁',
      city: city.name,
      temperature: tempData ? parseInt(tempData.temps[1]) : null,
      feelsLike: tempData ? parseInt(tempData.temps[1]) - 2 : null,
      humidity: null,
      precipitation: parsePrecipitation(forecast.timeSeries[1]?.areas[0]?.pops),
      windSpeed: null,
      weatherCondition: mapJMACondition(today.weatherCodes[0]),
      weatherDescription: today.weathers[0],
      icon: mapJMACondition(today.weatherCodes[0]),
      forecastDate: new Date().toISOString().split('T')[0],
      updatedAt: forecast.reportDatetime,
    };
  } catch (error) {
    console.error('JMA fetch error:', error);
    return getMockJMA(city.id);
  }
}

function getJMAAreaCode(cityId) {
  const codes = {
    tokyo: '130000',
    osaka: '270000',
    nagoya: '230000',
    sapporo: '016000',
    fukuoka: '400000',
  };
  return codes[cityId];
}

function mapJMACondition(code) {
  const codeStr = String(code);
  if (['100', '101', '110', '111'].includes(codeStr)) return 'clear';
  if (['200', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211'].includes(codeStr)) return 'cloudy';
  if (['300', '301', '302', '303', '304', '306', '308', '309', '311', '313', '314', '315'].includes(codeStr)) return 'rain';
  if (['340', '350', '361', '371', '400', '401', '402', '403', '405', '406', '407', '409', '411', '413'].includes(codeStr)) return 'snow';
  return 'cloudy';
}

function parsePrecipitation(pops) {
  if (!pops || pops.length === 0) return null;
  // Take the average of available precipitation probabilities
  const values = pops.filter(p => p !== '').map(Number);
  if (values.length === 0) return null;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}
