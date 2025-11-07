// En tu ReservaHome.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import RoomCard from './RoomCard';
import BookingModal from './BookingModal';
import { roomTypes, processPayment } from '../../services/roomData';
import '../css/RoomCard.css';
import '../css/BookingModal.css';
import { useAnimation } from '../../context/AnimationContext'; 
import img1 from '../../assets2/1.jpg';
import img2 from '../../assets2/2.jpeg';
import img3 from '../../assets2/3.jpeg';
import img4 from '../../assets2/4.jpg';
import img5 from '../../assets2/5.jpg';
import img6 from '../../assets2/6.jpg';
import img7 from '../../assets2/7.jpg';
import portada from '../../assets2/portadashome/1.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7];

// Componente para el Panel de Búsqueda
const SearchPanel = () => {
  const [arrivalDate, setArrivalDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Buscando disponibilidad:\nLlegada: ${arrivalDate}\nSalida: ${checkoutDate}\nAdultos: ${adults}\nNiños: ${children}`);
  };

  return (
    <form className="luxury-search-panel" onSubmit={handleSearch}>
      <div className="search-field">
        <label htmlFor="arrivalDate">Fecha de llegada</label>
        <input 
          type="date" 
          id="arrivalDate" 
          value={arrivalDate} 
          onChange={(e) => setArrivalDate(e.target.value)} 
          required 
        />
      </div>
      <div className="search-field">
        <label htmlFor="checkoutDate">Fecha de Check-out</label>
        <input 
          type="date" 
          id="checkoutDate" 
          value={checkoutDate} 
          onChange={(e) => setCheckoutDate(e.target.value)} 
          required 
        />
      </div>
      <div className="search-field select-field">
        <label htmlFor="adults">Adultos</label>
        <select id="adults" value={adults} onChange={(e) => setAdults(e.target.value)}>
          {[...Array(5).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
        </select>
      </div>
      <div className="search-field select-field">
        <label htmlFor="children">Niños</label>
        <select id="children" value={children} onChange={(e) => setChildren(e.target.value)}>
          {[...Array(5).keys()].map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <button type="submit" className="search-btn">
        BUSCAR
      </button>
    </form>
  );
};

// Componente del Carrusel que responde al Context
const LuxuryCarousel = () => {
  const { animationsPaused } = useAnimation(); 
  const [isHovered, setIsHovered] = useState(false);

  // Combina la pausa global del context con la pausa local del hover
  const shouldPause = animationsPaused || isHovered;

  return (
    <section className="luxury-carousel-section">
      <div className="luxury-text-top">
        <h2>El alma de un hogar, el respiro que necesitabas.</h2>
      </div>

      {/* Carrusel que responde al estado de animaciones */}
      <div 
        className="luxury-carousel-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="luxury-carousel-track"
          style={{ 
            animationPlayState: shouldPause ? 'paused' : 'running' 
          }}
        >
          {images.map((src, index) => (
            <div key={index} className={`luxury-slide slide-${index + 1}`}>
              <img 
                src={src} 
                alt={`Suite ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}

          {/* Duplicamos para scroll infinito */}
          {images.map((src, index) => (
            <div key={`dup-${index}`} className={`luxury-slide slide-${index + 1}`}>
              <img 
                src={src} 
                alt={`Suite ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="luxury-text-bottom">
        <h3>Conoce la Casa Hotel</h3>
      </div>
    </section>
  );
};

function ReservaHome() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

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

  const handleBackToMain = () => {
    navigate('/');
  };

  // 👇 NUEVA FUNCIÓN PARA NAVEGAR AL BOUTIQUE
  const handleGoToBoutique = () => {
    navigate('/boutique');
  };

  return (
    <div className={`App ${loaded ? 'loaded' : ''}`}>
      
      {/* Header de Navegación */}
      <nav className="luxury-top-nav">
        <div className="nav-menu">☰ MENÚ</div>
        <div className="nav-brand">LA CAPILLA</div>
        <div className="nav-reservation">RESERVACIÓN</div>
      </nav>

      {/* Hero Section */}
      <header className="luxury-hero new-hero">
        <div 
          className="hero-background-luxury new-hero-bg"
          style={{
            background: `linear-gradient(135deg, rgba(26, 26, 26, 0.4) 0%, rgba(45, 45, 45, 0.4) 100%), url(${portada}) center/cover`
          }}
        ></div>
        <div className="hero-overlay new-hero-overlay"></div>
        
        <div className="hero-content-luxury new-hero-content">
          <div className="new-tagline-small">
            UN REFUGIO CÁLIDO EN EL CORAZÓN DEL BAJÍO
          </div>
          
          <h1 className="new-hero-title">
            Donde cada rincón te hace sentir en casa
          </h1>
          
          <SearchPanel />
        </div>
      </header>

      {/* Carrusel optimizado */}
      <LuxuryCarousel />

      {/* Resto del código del Home permanece igual */}
      <main className="luxury-main">
        <section id="suites" className="suites-section">
          <div className="section-header-luxury">
            <div className="section-ornament"></div>
            <h2 className="section-title-luxury">Nuestras Suites</h2>
            <p className="section-subtitle-luxury">
              Descubre nuestra colección de suites donde el lujo se encuentra con la comodidad, 
              y cada detalle está meticulosamente diseñado para su placer.
            </p>
            <div className="section-ornament"></div>
          </div>

          <div className="suites-list"> 
            {roomTypes.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Sección Boutique */}
      <section className="boutique-section">
        <div className="boutique-content">
          <p className="boutique-text">
            ¿Buscas una experiencia diferente? Descubre nuestro <strong>HOTEL BOUTIQUE</strong>, donde la elegancia y la calma transforman cada instante.
          </p>
          {/* 👇 BOTÓN CON NAVEGACIÓN */}
          <button className="boutique-btn" onClick={handleGoToBoutique}>
            Ver Hotel Boutique
          </button>
        </div>
      </section>

    {/* Footer de Lujo */}
<footer className="luxury-footer">
  <div className="footer-content-luxury">
    
    {/* 1. COLUMNA IZQUIERDA - Logo y contacto */}
    <div className="footer-left">
      <div className="footer-brand">
        <div className="footer-logo-image">
          {/* SVG del Logo (código original) */}
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
            <ellipse cx="30" cy="15" rx="20" ry="8" fill="#b8964f"/>
            <rect x="25" y="15" width="10" height="40" fill="#8b7355"/>
            <ellipse cx="30" cy="55" rx="25" ry="10" fill="#b8964f"/>
            <text x="30" y="70" textAnchor="middle" fill="#8b7355" fontSize="8" fontFamily="serif">LA CAPILLA</text>
            <text x="30" y="77" textAnchor="middle" fill="#8b7355" fontSize="6" fontFamily="serif">HOTEL</text>
          </svg>
        </div>
        <h3 className="footer-logo-text">La Capilla</h3>
        <p className="footer-hotel-subtitle">HOTEL</p>
      </div>
      
      <div className="footer-contact-list">
        <a href="https://wa.me/524777347474" className="footer-contact-item">
          <span className="contact-icon">📱</span>
          <span>+52 4777 34 7474</span>
        </a>
        <a href="#lobby" className="footer-contact-item">
          <span className="contact-icon">🏛️</span>
          <span>Lobby</span>
        </a>
        <a href="#bodas" className="footer-contact-item">
          <span className="contact-icon">💒</span>
          <span>Bodas</span>
        </a>
        <a href="mailto:lacapillasl@gmail.com" className="footer-contact-item">
          <span className="contact-icon">✉️</span>
          <span>lacapillasl@gmail.com</span>
        </a>
      </div>
    </div>
    
    {/* 2. COLUMNA DERECHA - Redes, Habitaciones y Mapa (FUSIONADO) */}
        {/* Mapa */}
        <div className="map-container">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.528157656598!2d-100.85089992496557!3d21.131369580543762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842b396ed04be78f%3A0x762e7b72784e7cc5!2sLa%20Capilla%20Hotel!5e0!3m2!1ses-419!2smx!4v1762517651261!5m2!1ses-419!2smx"
                width="100%"
                height="250"
                style={{border:0}}
                allowFullScreen=""
                loading="lazy"
                title="La Capilla Hotel Location"
            ></iframe>
        </div>    
  </div>
    

  {/* Copyright */}
  <div className="footer-bottom-luxury">
    <p>© COPYRIGHT LA CAPILLA HOTEL 2025</p>
  </div>
</footer>

      {/* Botón Scroll to Top */}
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

export default ReservaHome;