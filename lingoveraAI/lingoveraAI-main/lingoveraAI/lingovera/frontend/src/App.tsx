import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SpeakWritePage from './pages/SpeakWritePage';
import { Toaster } from 'react-hot-toast';

// Create Dark Mode Context
interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Check if dark mode preference exists in localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/speak-write/:sessionId" element={<SpeakWritePage />} />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </Router>
    </DarkModeContext.Provider>
  );
}

export default App;
