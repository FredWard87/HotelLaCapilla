import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReservaHome from './components/Reserva/ReservaHome';
import Home from './components/Home/home'; // Tu página principal existente
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservas" element={<ReservaHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;