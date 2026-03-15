/**
 * WeatherIcon — SVG weather icons based on condition
 */
export default function WeatherIcon({ condition, size = 48 }) {
  const icons = {
    clear: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="14" fill="#fbbf24" />
        <g stroke="#fbbf24" strokeWidth="3" strokeLinecap="round">
          <line x1="32" y1="4" x2="32" y2="12" />
          <line x1="32" y1="52" x2="32" y2="60" />
          <line x1="4" y1="32" x2="12" y2="32" />
          <line x1="52" y1="32" x2="60" y2="32" />
          <line x1="12.2" y1="12.2" x2="17.9" y2="17.9" />
          <line x1="46.1" y1="46.1" x2="51.8" y2="51.8" />
          <line x1="12.2" y1="51.8" x2="17.9" y2="46.1" />
          <line x1="46.1" y1="17.9" x2="51.8" y2="12.2" />
        </g>
      </svg>
    ),
    cloudy: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <path
          d="M20 44C13.4 44 8 38.6 8 32c0-5.5 3.7-10.1 8.8-11.4C18.2 14.7 23.6 10 30 10c7.2 0 13.2 5.1 14.6 11.8C49.1 23 52 26.6 52 31c0 5.5-4.5 10-10 10H20z"
          fill="#94a3b8"
          opacity="0.9"
        />
        <path
          d="M28 48c-4.4 0-8-3.6-8-8h2c0 3.3 2.7 6 6 6h22c4.4 0 8-3.6 8-8s-3.6-8-8-8h-1.2c-.8-5.6-5.6-10-11.4-10-3 0-5.7 1.2-7.8 3"
          fill="#cbd5e1"
        />
      </svg>
    ),
    rain: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <path
          d="M18 36C12.5 36 8 31.5 8 26c0-4.6 3.1-8.4 7.3-9.5C16.5 11.4 21.1 7 26.6 7c6 0 11 4.2 12.2 9.8C42.6 17.8 45 20.8 45 24.5c0 4.7-3.8 8.5-8.5 8.5H18z"
          fill="#64748b"
        />
        <line x1="20" y1="42" x2="16" y2="54" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <line x1="30" y1="42" x2="26" y2="54" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        <line x1="40" y1="42" x2="36" y2="54" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <line x1="25" y1="48" x2="21" y2="60" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <line x1="35" y1="48" x2="31" y2="60" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    snow: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <path
          d="M18 34C12.5 34 8 29.5 8 24c0-4.6 3.1-8.4 7.3-9.5C16.5 9.4 21.1 5 26.6 5c6 0 11 4.2 12.2 9.8C42.6 15.8 45 18.8 45 22.5c0 4.7-3.8 8.5-8.5 8.5H18z"
          fill="#94a3b8"
        />
        <circle cx="18" cy="44" r="2.5" fill="#e2e8f0" opacity="0.9" />
        <circle cx="28" cy="48" r="2" fill="#e2e8f0" opacity="0.7" />
        <circle cx="38" cy="44" r="2.5" fill="#e2e8f0" opacity="0.8" />
        <circle cx="23" cy="54" r="2" fill="#e2e8f0" opacity="0.6" />
        <circle cx="33" cy="56" r="2.5" fill="#e2e8f0" opacity="0.7" />
        <circle cx="43" cy="52" r="2" fill="#e2e8f0" opacity="0.5" />
      </svg>
    ),
    storm: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <path
          d="M18 32C12.5 32 8 27.5 8 22c0-4.6 3.1-8.4 7.3-9.5C16.5 7.4 21.1 3 26.6 3c6 0 11 4.2 12.2 9.8C42.6 13.8 45 16.8 45 20.5c0 4.7-3.8 8.5-8.5 8.5H18z"
          fill="#475569"
        />
        <polygon points="30,36 22,50 28,50 24,62 38,46 32,46 36,36" fill="#fbbf24" />
        <line x1="16" y1="44" x2="12" y2="56" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="42" y1="42" x2="38" y2="54" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  };

  return (
    <div className="weather-icon" style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icons[condition] || icons.cloudy}
    </div>
  );
}
