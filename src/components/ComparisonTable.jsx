import WeatherIcon from './WeatherIcon';
import {
  formatTemperature,
  formatHumidity,
  formatPrecipitation,
  formatWindSpeed,
} from '../utils/formatters';
import { SOURCES } from '../utils/constants';
import './ComparisonTable.css';

function getSourceDotClass(source) {
  if (source === SOURCES.OPEN_WEATHER_MAP) return 'owm';
  if (source === SOURCES.WEATHER_API) return 'weatherapi';
  if (source === SOURCES.JMA) return 'jma';
  return '';
}

export default function ComparisonTable({ weatherData }) {
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="comparison-table-wrapper">
        <p style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          データを取得中...
        </p>
      </div>
    );
  }

  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>データソース</th>
            <th>天気</th>
            <th>気温</th>
            <th>体感温度</th>
            <th>降水確率</th>
            <th>湿度</th>
            <th>風速</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((data, index) => (
            <tr key={data.source} style={{ animationDelay: `${index * 0.1}s` }}>
              <td>
                <div className="table-source">
                  <span className={`table-source-dot ${getSourceDotClass(data.source)}`}></span>
                  {data.source}
                </div>
              </td>
              <td>
                <div className="table-condition">
                  <WeatherIcon condition={data.weatherCondition} size={28} />
                  <span>{data.weatherDescription}</span>
                </div>
              </td>
              <td>
                <span className="table-temp">
                  {formatTemperature(data.temperature)}
                </span>
              </td>
              <td>{formatTemperature(data.feelsLike)}</td>
              <td>
                <div className="table-bar">
                  <div className="table-bar-track">
                    <div
                      className="table-bar-fill precipitation"
                      style={{ width: `${data.precipitation ?? 0}%` }}
                    ></div>
                  </div>
                  <span className="table-bar-value">
                    {formatPrecipitation(data.precipitation)}
                  </span>
                </div>
              </td>
              <td>
                <div className="table-bar">
                  <div className="table-bar-track">
                    <div
                      className="table-bar-fill humidity"
                      style={{ width: `${data.humidity ?? 0}%` }}
                    ></div>
                  </div>
                  <span className="table-bar-value">
                    {formatHumidity(data.humidity)}
                  </span>
                </div>
              </td>
              <td>{formatWindSpeed(data.windSpeed)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
