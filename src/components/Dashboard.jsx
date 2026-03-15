import { useState, useEffect, useCallback } from 'react';
import { fetchAllWeatherData } from '../api/weatherService';
import { CITIES, VIEW_MODES } from '../utils/constants';
import { formatTemperature, formatPrecipitation, formatWindSpeed } from '../utils/formatters';
import CitySelector from './CitySelector';
import ViewToggle from './ViewToggle';
import WeatherCard from './WeatherCard';
import ComparisonTable from './ComparisonTable';
import './Dashboard.css';

export default function Dashboard() {
  const [selectedCityId, setSelectedCityId] = useState('tokyo');
  const [viewMode, setViewMode] = useState(VIEW_MODES.CARDS);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCity = CITIES.find(c => c.id === selectedCityId);

  const loadWeatherData = useCallback(async () => {
    if (!selectedCity) return;
    setLoading(true);
    try {
      const data = await fetchAllWeatherData(selectedCity);
      setWeatherData(data);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData]);

  // Compute summary stats
  const avgTemp = weatherData.length > 0
    ? Math.round(weatherData.reduce((sum, d) => sum + (d.temperature ?? 0), 0) / weatherData.length)
    : null;
  const maxPrecip = weatherData.length > 0
    ? Math.max(...weatherData.map(d => d.precipitation ?? 0))
    : null;
  const avgWind = weatherData.length > 0
    ? +(weatherData.reduce((sum, d) => sum + (d.windSpeed ?? 0), 0) / weatherData.length).toFixed(1)
    : null;

  return (
    <main className="dashboard">
      {/* Toolbar */}
      <div className="dashboard-toolbar">
        <div className="dashboard-toolbar-left">
          <CitySelector
            selectedCity={selectedCityId}
            onCityChange={setSelectedCityId}
          />
          <button
            className={`dashboard-refresh-btn ${loading ? 'loading' : ''}`}
            onClick={loadWeatherData}
            disabled={loading}
            id="refresh-btn"
          >
            <svg className="refresh-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8a6 6 0 11-1.5-3.96" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 2v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {loading ? '取得中...' : '更新'}
          </button>
        </div>
        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Summary Bar */}
      <div className="dashboard-summary">
        <div className="summary-item">
          <div className="summary-icon">🌡️</div>
          <div className="summary-content">
            <div className="summary-label">平均気温</div>
            <div className="summary-value">{avgTemp != null ? formatTemperature(avgTemp) : '--'}</div>
            <div className="summary-subtext">{weatherData.length}ソースの平均</div>
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-icon">🌧️</div>
          <div className="summary-content">
            <div className="summary-label">最大降水確率</div>
            <div className="summary-value">{maxPrecip != null ? formatPrecipitation(maxPrecip) : '--'}</div>
            <div className="summary-subtext">全ソース中の最大値</div>
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-icon">💨</div>
          <div className="summary-content">
            <div className="summary-label">平均風速</div>
            <div className="summary-value">{avgWind != null ? formatWindSpeed(avgWind) : '--'}</div>
            <div className="summary-subtext">{weatherData.length}ソースの平均</div>
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-icon">📍</div>
          <div className="summary-content">
            <div className="summary-label">選択中の都市</div>
            <div className="summary-value">{selectedCity?.name ?? '--'}</div>
            <div className="summary-subtext">{selectedCity?.nameEn}</div>
          </div>
        </div>
      </div>

      {/* Weather Content */}
      {viewMode === VIEW_MODES.CARDS ? (
        <div className="dashboard-cards">
          {loading
            ? [0, 1, 2].map(i => <WeatherCard key={i} data={null} index={i} />)
            : weatherData.map((data, index) => (
                <WeatherCard key={data.source} data={data} index={index} />
              ))
          }
        </div>
      ) : (
        <ComparisonTable weatherData={loading ? [] : weatherData} />
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Weather Compare — 統合天気予報ダッシュボード</p>
        <p style={{ marginTop: 4 }}>
          データソース: OpenWeatherMap / WeatherAPI / 気象庁（現在モックデータで動作中）
        </p>
      </footer>
    </main>
  );
}
