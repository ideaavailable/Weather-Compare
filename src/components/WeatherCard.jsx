import WeatherIcon from './WeatherIcon';
import {
  formatTemperature,
  formatHumidity,
  formatPrecipitation,
  formatWindSpeed,
  formatTime,
} from '../utils/formatters';
import './WeatherCard.css';

export default function WeatherCard({ data, index }) {
  if (!data) return <WeatherCardSkeleton />;

  return (
    <div
      className="weather-card"
      data-source={data.source}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="card-header">
        <div className="card-source">
          <span className="card-source-dot"></span>
          <span className="card-source-name">{data.source}</span>
        </div>
        <span className="card-updated">
          更新: {formatTime(data.updatedAt)}
        </span>
      </div>

      {/* Main Weather */}
      <div className="card-main">
        <div className="card-icon-wrapper">
          <WeatherIcon condition={data.weatherCondition} size={56} />
        </div>
        <div className="card-temp-section">
          <div className="card-temperature">
            {formatTemperature(data.temperature)}
          </div>
          <div className="card-feels-like">
            体感 {formatTemperature(data.feelsLike)}
          </div>
          <div className="card-description">
            {data.weatherDescription}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="card-details">
        <div className="card-detail">
          <span className="card-detail-label">降水確率</span>
          <span className="card-detail-value">
            {formatPrecipitation(data.precipitation)}
          </span>
          <div className="card-detail-bar">
            <div
              className="card-detail-bar-fill precipitation"
              style={{ width: `${data.precipitation ?? 0}%` }}
            ></div>
          </div>
        </div>
        <div className="card-detail">
          <span className="card-detail-label">湿度</span>
          <span className="card-detail-value">
            {formatHumidity(data.humidity)}
          </span>
          <div className="card-detail-bar">
            <div
              className="card-detail-bar-fill humidity"
              style={{ width: `${data.humidity ?? 0}%` }}
            ></div>
          </div>
        </div>
        <div className="card-detail">
          <span className="card-detail-label">風速</span>
          <span className="card-detail-value">
            {formatWindSpeed(data.windSpeed)}
          </span>
        </div>
        <div className="card-detail">
          <span className="card-detail-label">予報日</span>
          <span className="card-detail-value" style={{ fontSize: 'var(--font-size-sm)' }}>
            {data.forecastDate}
          </span>
        </div>
      </div>
    </div>
  );
}

function WeatherCardSkeleton() {
  return (
    <div className="weather-card-skeleton">
      <div className="skeleton-line short skeleton"></div>
      <div style={{ height: 24 }}></div>
      <div className="skeleton-line large skeleton"></div>
      <div className="skeleton-line medium skeleton"></div>
      <div style={{ height: 24 }}></div>
      <div className="skeleton-line skeleton"></div>
      <div className="skeleton-line skeleton"></div>
    </div>
  );
}
