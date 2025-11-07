// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReservaHome from './components/Reserva/ReservaHome';
import Home from './components/Home/home';
import { AnimationProvider } from './context/AnimationContext';
import './App.css';
import Boutique from './components/ReservaBoutique/ReservaHomeBoutique'

function App() {
  return (
    <AnimationProvider> {/* 👈 ENVOLVER CON EL PROVIDER */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservas" element={<ReservaHome />} />
            <Route path="/boutique" element={<Boutique />} />
          </Routes>
        </div>
      </Router>
    </AnimationProvider>
  );
}

export default App;