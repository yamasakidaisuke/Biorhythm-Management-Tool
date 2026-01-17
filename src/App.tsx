import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { DailyEntryPage } from './pages/DailyEntryPage';
import { HistoryPage } from './pages/HistoryPage';
import { parseDate } from './lib/date-utils';
import './App.css';

function AppContent() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateSelect = useCallback(
    (dateString: string) => {
      setCurrentDate(parseDate(dateString));
      navigate('/');
    },
    [navigate]
  );

  return (
    <div className="app">
      <nav className="app-nav">
        <Link to="/" className="nav-link">
          今日
        </Link>
        <Link to="/history" className="nav-link">
          履歴
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <DailyEntryPage date={currentDate} onDateChange={setCurrentDate} />
          }
        />
        <Route
          path="/history"
          element={<HistoryPage onDateSelect={handleDateSelect} />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
