import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import Auth from './pages/Auth';
import RidePage from './pages/RidePage';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route
            path="/ride/*"
            element={
              <ProtectedRoute>
                <RidePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
