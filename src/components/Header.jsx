import { formatDate } from '../utils/formatters';
import './Header.css';

export default function Header() {
  const today = new Date();
  const dateStr = formatDate(today.toISOString());
  const dayOfWeek = today.toLocaleDateString('ja-JP', { weekday: 'long' });

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo">⛅</div>
          <div>
            <h1 className="header-title">Weather Compare</h1>
            <p className="header-subtitle">統合天気予報ダッシュボード</p>
          </div>
        </div>
        <div className="header-meta">
          <div className="header-date">
            <div>{dateStr}</div>
            <div>{dayOfWeek}</div>
          </div>
          <div className="header-status">
            <span className="header-status-dot"></span>
            <span>モックデータ</span>
          </div>
        </div>
      </div>
    </header>
  );
}
