import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

function Home() {
  const navigate = useNavigate();

  const handleGoToReservas = () => {
    navigate('/reservas');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="home-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="home-title">Bienvenido a La Capilla</h1>
          <p className="home-subtitle">Hotel Boutique & Experiencias Únicas</p>
          
          <div className="home-actions">
            <button 
              className="cta-primary"
              onClick={handleGoToReservas}
            >
              Ver Suites & Reservar
            </button>
            <button className="cta-secondary">
              Conocer Más
            </button>
          </div>
        </div>
      </header>

      {/* Contenido de la página principal */}
      <main className="home-main">
        <section className="intro-section">
          <h2>Descubre Nuestro Mundo</h2>
          <p>Una experiencia hotelera que redefine el lujo y la comodidad</p>
        </section>
        
        {/* Más secciones de tu página principal */}
      </main>
    </div>
  );
}

export default Home;