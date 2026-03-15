import { VIEW_MODES } from '../utils/constants';
import './ViewToggle.css';

export default function ViewToggle({ viewMode, onViewChange }) {
  return (
    <div className="view-toggle">
      <button
        className={`view-toggle-btn ${viewMode === VIEW_MODES.CARDS ? 'active' : ''}`}
        onClick={() => onViewChange(VIEW_MODES.CARDS)}
        title="カード表示"
        id="view-cards-btn"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="1" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="10" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="10" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>カード</span>
      </button>
      <button
        className={`view-toggle-btn ${viewMode === VIEW_MODES.TABLE ? 'active' : ''}`}
        onClick={() => onViewChange(VIEW_MODES.TABLE)}
        title="テーブル表示"
        id="view-table-btn"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="7" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="13" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>テーブル</span>
      </button>
    </div>
  );
}
