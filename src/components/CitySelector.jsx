import { CITIES } from '../utils/constants';
import './CitySelector.css';

export default function CitySelector({ selectedCity, onCityChange }) {
  return (
    <div className="city-selector">
      <label className="city-selector-label" htmlFor="city-select">
        📍 都市を選択
      </label>
      <select
        id="city-select"
        className="city-selector-select"
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
      >
        {CITIES.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name} ({city.nameEn})
          </option>
        ))}
      </select>
    </div>
  );
}
