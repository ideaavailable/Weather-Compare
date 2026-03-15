// Cities available for forecast
export const CITIES = [
  { id: 'tokyo', name: '東京', nameEn: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { id: 'osaka', name: '大阪', nameEn: 'Osaka', lat: 34.6937, lon: 135.5023 },
  { id: 'nagoya', name: '名古屋', nameEn: 'Nagoya', lat: 35.1815, lon: 136.9066 },
  { id: 'sapporo', name: '札幌', nameEn: 'Sapporo', lat: 43.0618, lon: 141.3545 },
  { id: 'fukuoka', name: '福岡', nameEn: 'Fukuoka', lat: 33.5904, lon: 130.4017 },
];

// Weather API sources
export const SOURCES = {
  OPEN_WEATHER_MAP: 'OpenWeatherMap',
  WEATHER_API: 'WeatherAPI',
  JMA: '気象庁',
};

// Source color mapping
export const SOURCE_COLORS = {
  [SOURCES.OPEN_WEATHER_MAP]: {
    accent: 'var(--color-owm)',
    bg: 'var(--color-owm-bg)',
    gradient: 'var(--gradient-card-owm)',
    glow: 'var(--shadow-glow-owm)',
  },
  [SOURCES.WEATHER_API]: {
    accent: 'var(--color-weatherapi)',
    bg: 'var(--color-weatherapi-bg)',
    gradient: 'var(--gradient-card-weatherapi)',
    glow: 'var(--shadow-glow-weatherapi)',
  },
  [SOURCES.JMA]: {
    accent: 'var(--color-jma)',
    bg: 'var(--color-jma-bg)',
    gradient: 'var(--gradient-card-jma)',
    glow: 'var(--shadow-glow-jma)',
  },
};

// Weather conditions
export const WEATHER_CONDITIONS = {
  CLEAR: 'clear',
  CLOUDY: 'cloudy',
  RAIN: 'rain',
  SNOW: 'snow',
  STORM: 'storm',
};

// View modes
export const VIEW_MODES = {
  CARDS: 'cards',
  TABLE: 'table',
};
