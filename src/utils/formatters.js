/**
 * Format temperature with unit
 * @param {number} temp - Temperature in Celsius
 * @returns {string}
 */
export function formatTemperature(temp) {
  if (temp == null) return '--';
  return `${Math.round(temp)}°C`;
}

/**
 * Format humidity percentage
 * @param {number} humidity
 * @returns {string}
 */
export function formatHumidity(humidity) {
  if (humidity == null) return '--';
  return `${Math.round(humidity)}%`;
}

/**
 * Format precipitation probability
 * @param {number} precipitation
 * @returns {string}
 */
export function formatPrecipitation(precipitation) {
  if (precipitation == null) return '--';
  return `${Math.round(precipitation)}%`;
}

/**
 * Format wind speed
 * @param {number} speed - Wind speed in m/s
 * @returns {string}
 */
export function formatWindSpeed(speed) {
  if (speed == null) return '--';
  return `${speed.toFixed(1)} m/s`;
}

/**
 * Format date to Japanese locale
 * @param {string} dateStr - ISO date string
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '--';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format time to Japanese locale
 * @param {string} dateStr - ISO datetime string
 * @returns {string}
 */
export function formatTime(dateStr) {
  if (!dateStr) return '--';
  const date = new Date(dateStr);
  return date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get weather condition label in Japanese
 * @param {string} condition
 * @returns {string}
 */
export function getWeatherLabel(condition) {
  const labels = {
    clear: '晴れ',
    cloudy: '曇り',
    rain: '雨',
    snow: '雪',
    storm: '嵐',
  };
  return labels[condition] || condition;
}
