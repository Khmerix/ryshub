import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ToeflPage from './pages/ToeflPage';
import BooksPage from './pages/BooksPage';
import GamesPage from './pages/GamesPage';
import CommandCenterPage from './pages/CommandCenterPage';
import TimerPage from './pages/TimerPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/toefl" element={<ToeflPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/command-center" element={<CommandCenterPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
