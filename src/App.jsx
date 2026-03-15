import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-main">
        <Dashboard />
      </div>
    </div>
  );
}
