import React, { useState, useEffect } from 'react';
import './App.css';
import RoomCard from './components/RoomCard';
import BookingModal from './components/BookingModal';
import { roomTypes, processPayment } from './services/roomData';

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleBook = async (bookingData) => {
    try {
      const result = await processPayment(bookingData.paymentInfo);
      
      if (result.success) {
        // Simular envío de correo
        setTimeout(() => {
          handleCloseModal();
          alert(`🏨 ¡Reserva Confirmada en La Capilla!\n\n📋 ID de Reserva: ${result.bookingId}\n💳 Transacción: ${result.transactionId}\n💰 Total: $${bookingData.total.toLocaleString()} MXN\n📧 Confirmación enviada a: ${bookingData.guestInfo.email}\n\n¡Esperamos brindarle una experiencia excepcional!`);
        }, 1000);
      }
    } catch (error) {
      alert(`❌ Transacción Declinada\n\n${error.message}\n\nPor favor, verifique los datos de su tarjeta o utilice otro método de pago.`);
      throw error;
    }
  };

  return (
    <div className={`App ${loaded ? 'loaded' : ''}`}>
      {/* Hero Section de Lujo */}
      <header className="luxury-hero">
        <div className="hero-background-luxury"></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content-luxury">
          <div className="luxury-brand-header">
            <div className="brand-ornament top"></div>
            <h1 className="luxury-hotel-name">La Capilla</h1>
            <div className="brand-subtitle">Hotel Boutique</div>
            <div className="brand-ornament bottom"></div>
          </div>
          
          <div className="hero-tagline">
            <p className="tagline-text">Donde el diseño y la tranquilidad elevan tu escape</p>
          </div>
          
          <div className="hero-cta-luxury">
            <button 
              className="discover-btn"
              onClick={() => document.getElementById('suites').scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="discover-text">Ver Nuestras Suites</span>
              <span className="discover-arrow">↓</span>
            </button>
          </div>
        </div>
        
        <div className="scroll-indicator-luxury">
          <div className="scroll-line"></div>
        </div>
      </header>

      {/* Sección Principal */}
      <main className="luxury-main">
        <section id="suites" className="suites-section">
          <div className="section-header-luxury">
            <div className="section-ornament"></div>
            <h2 className="section-title-luxury">Nuestras Suites Exclusivas</h2>
            <p className="section-subtitle-luxury">
              Descubre nuestra colección de suites donde el lujo se encuentra con la comodidad, 
              y cada detalle está meticulosamente diseñado para su placer.
            </p>
            <div className="section-ornament"></div>
          </div>

          <div className="suites-grid">
            {roomTypes.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>

        {/* Sección de Servicios de Lujo */}
        <section className="services-section">
          <div className="section-header-luxury">
            <h2 className="section-title-luxury">Servicios & Amenidades</h2>
            <p className="section-subtitle-luxury">
              Experimente el estándar dorado de la hospitalidad con nuestros servicios exclusivos
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🛎️</div>
              <h3>Room Service 24/7</h3>
              <p>Servicio de habitaciones gourmet disponible las 24 horas del día con menú exclusivo</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3>Valet Parking</h3>
              <p>Estacionamiento con servicio de valet profesional incluido para su comodidad</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🏊</div>
              <h3>Alberca Infinity</h3>
              <p>Alberca climatizada tipo infinity con servicio exclusivo de cabañas privadas</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Business Center</h3>
              <p>Área de trabajo ejecutivo completamente equipada con tecnología de vanguardia</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🏋️</div>
              <h3>Wellness Center</h3>
              <p>Gimnasio premium equipado con tecnología de última generación y entrenador personal</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3>Transporte Ejecutivo</h3>
              <p>Servicio de transporte premium hacia destinos selectos dentro de la ciudad</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer de Lujo */}
      <footer className="luxury-footer">
        <div className="footer-content-luxury">
          <div className="footer-brand">
            <h3 className="footer-logo">La Capilla</h3>
            <p className="footer-tagline">Redefiniendo la excelencia hotelera</p>
          </div>
          
          <div className="footer-info">
            <div className="info-group">
              <h4>Contacto</h4>
              <p>📍 Av. Principal 123, Colonia Elegante</p>
              <p>📞 +52 55 1234 5678</p>
              <p>✉️ reservaciones@lacapilla.com</p>
            </div>
            
            <div className="info-group">
              <h4>Horarios</h4>
              <p>Check-in: 3:00 PM</p>
              <p>Check-out: 12:00 PM</p>
              <p>Recepción: 24 Horas</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom-luxury">
          <div className="footer-divider"></div>
          <p>&copy; 2024 La Capilla Hotel Boutique. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Botón Scroll to Top de Lujo */}
      {showScrollTop && (
        <button className="luxury-scroll-top" onClick={scrollToTop}>
          <span className="scroll-icon">↑</span>
        </button>
      )}

      {/* Modal de Reserva */}
      <BookingModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBook={handleBook}
      />
    </div>
  );
}

export default App;