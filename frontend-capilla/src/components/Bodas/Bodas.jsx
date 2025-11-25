import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Bodas.css';

import heroImage from '../../assets2/Bodas/9.jpg'; // Imagen del encabezado
import boda1 from '../../assets2/Bodas/1.jpeg';
import boda2 from '../../assets2/Bodas/2.JPG';
import boda3 from '../../assets2/Bodas/3.jpg';
import boda4 from '../../assets2/Bodas/4.jpg';
import boda5 from '../../assets2/Bodas/5.jpg';
import boda6 from '../../assets2/Bodas/6.jpg';
import destacado1 from '../../assets2/Bodas/7.jpeg';
import destacado2 from '../../assets2/Bodas/8.jpg';
import galeria1 from '../../assets2/Bodas/extra/1.jpg';
import galeria2 from '../../assets2/Bodas/extra/2.jpg';
import galeria3 from '../../assets2/Bodas/extra/4.jpg';
import galeria4 from '../../assets2/Bodas/extra/5.jpg';
import galeria5 from '../../assets2/Bodas/extra/7.jpg';
import galeria6 from '../../assets2/Bodas/extra/9.jpg';
import galeria7 from '../../assets2/Bodas/extra/10.jpg';
import galeria8 from '../../assets2/Bodas/compartida/2.jpg';
import galeria9 from '../../assets2/Bodas/compartida/4.jpg';
import momento1 from '../../assets2/Bodas/extra/3.jpg';
import momento2 from '../../assets2/Bodas/compartida/3.jpg';

// Imagen para CTA Final
import ctaBackground from '../../assets2/Bodas/extra/1.jpg';

// Iconos SVG
const HotelIcon = () => (
  <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const JardinIcon = () => (
  <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const CeremoniaIcon = () => (
  <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StaffIcon = () => (
  <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CoctelIcon = () => (
  <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const ValetIcon = () => (
  <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

function Bodas() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true); // Control de autoplay

  // TODAS las imágenes excepto la 9 van en el carrusel
  const carouselImages = [boda1, boda2, boda3, boda4, boda5, boda6, destacado1, destacado2];

  const features = [
    { icon: HotelIcon, title: 'Hotel Capacidad 100 personas' },
    { icon: JardinIcon, title: 'Jardín Principal' },
    { icon: CeremoniaIcon, title: 'Ceremonia 1 Hora' },
    { icon: StaffIcon, title: 'Staff de Limpieza' },
    { icon: CoctelIcon, title: 'Cóctel de Bienvenida 1 hora' },
    { icon: ValetIcon, title: 'Valet Parking' }
  ];

  // Carrusel automático
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 2500 ); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false); // Detiene el autoplay al interactuar
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false); // Detiene el autoplay al interactuar
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false); // Detiene el autoplay al interactuar
    setCurrentSlide(index);
  };

  const handleCarouselMouseEnter = () => {
    setIsAutoPlaying(false); // Pausa al pasar el mouse
  };

  const handleCarouselMouseLeave = () => {
    setIsAutoPlaying(true); // Resume al quitar el mouse
  };

  const handleReservacion = () => {
    navigate('/reservas');
  };

  return (
    <div className="bodas-page">
      {/* Header */}
      <header className="bodas-header">
        <div className="bodas-header-content">
          <button className="menu-button">
            <MenuIcon />
          </button>

          <div className="logo">La Capilla</div>

          <button className="reservacion-button" onClick={handleReservacion}>
            RESERVACIÓN
          </button>
        </div>
      </header>

      {/* Hero Section con imagen de fondo */}
      <section 
        className="bodas-hero-image"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-subtitle">PLANIFICA TU BODA</p>
          <h1 className="hero-title">
            El lugar donde reúnes a quienes más amas para celebrar el día más importante de tu vida
          </h1>
        </div>
      </section>

      {/* Sección con texto elegante */}
      <section className="bodas-intro">
        <div className="bodas-intro-content">
          <h2 className="bodas-intro-title">
            Hay <span className="highlight">momentos</span> que se viven mejor rodeado de tus
            seres queridos. En <span className="highlight">La Capilla</span>, tu y tus invitados
            celebran, descansan y crean recuerdos sin moverse de lugar.
          </h2>
        </div>
      </section>

      {/* Carousel con autoplay */}
      <section 
        className="bodas-carousel"
        onMouseEnter={handleCarouselMouseEnter}
        onMouseLeave={handleCarouselMouseLeave}
      >
        <div className="carousel-container">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentSlide ? 'active' : index < currentSlide ? 'prev' : 'next'
              }`}
            >
              <img src={image} alt={`Boda ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </div>

        <button className="carousel-nav-button prev" onClick={prevSlide}>
          <ChevronLeftIcon />
        </button>
        <button className="carousel-nav-button next" onClick={nextSlide}>
          <ChevronRightIcon />
        </button>

        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Momentos Section */}
      <section className="momentos-section">
        <h2 className="momentos-title">MOMENTOS INOLVIDABLES</h2>
      </section>

      {/* Destacados Section */}
      <section className="destacados-section">
        <div className="destacados-container">
          <div className="section-title-container">
            <div className="title-line"></div>
            <h2 className="section-title">Destacados</h2>
            <div className="title-line"></div>
          </div>

          <h3 className="destacados-subtitle">
            Un escenario diseñado para<br />celebrar tu gran día
          </h3>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <feature.icon />
                <h4 className="feature-title">{feature.title}</h4>
              </div>
            ))}
          </div>

          {/* Images Grid - Puedes agregar más imágenes aquí si quieres */}
          <div className="images-grid">
            <div className="image-container">
              <img src={boda1} alt="Espacio para eventos 1" />
            </div>
            <div className="image-container">
              <img src={boda2} alt="Espacio para eventos 2" />
            </div>
          </div>
        </div>
      </section>

      <section className="galeria-momentos-section">
  <div className="galeria-momentos-container">
    {/* Título */}
    <div className="galeria-momentos-header">
      <h2 className="galeria-momentos-title">Cada momento es único</h2>
      <p className="galeria-momentos-text">
        Descubre los espacios donde tus sueños cobran vida
      </p>
    </div>

    {/* Grid de imágenes - Diseño masonry mejorado */}
    <div className="galeria-momentos-grid">
      <div className="galeria-momentos-item galeria-item-large">
        <img src={galeria1} alt="Momento 1" />
        <div className="galeria-momentos-overlay"></div>
      </div>
      
      <div className="galeria-momentos-item">
        <img src={galeria2} alt="Momento 2" />
        <div className="galeria-momentos-overlay"></div>
      </div>
      
      <div className="galeria-momentos-item">
        <img src={galeria3} alt="Momento 3" />
        <div className="galeria-momentos-overlay"></div>
      </div>
      
      <div className="galeria-momentos-item galeria-item-tall">
        <img src={galeria4} alt="Momento 4" />
        <div className="galeria-momentos-overlay"></div>
      </div>
      
      <div className="galeria-momentos-item">
        <img src={galeria5} alt="Momento 5" />
        <div className="galeria-momentos-overlay"></div>
      </div>
      
      <div className="galeria-momentos-item">
        <img src={galeria6} alt="Momento 6" />
        <div className="galeria-momentos-overlay"></div>
      </div>
      
      <div className="galeria-momentos-item">
        <img src={galeria7} alt="Momento 7" />
        <div className="galeria-momentos-overlay"></div>
      </div>
      
      <div className="galeria-momentos-item galeria-item-wide">
        <img src={galeria8} alt="Momento 8" />
        <div className="galeria-momentos-overlay"></div>
      </div>
      
      <div className="galeria-momentos-item">
        <img src={galeria9} alt="Momento 9" />
        <div className="galeria-momentos-overlay"></div>
      </div>
    </div>
  </div>
</section>

{/* Sección de 2 imágenes con texto */}
<section className="momentos-destacados-section">
  <div className="momentos-destacados-grid">
    <div className="momento-destacado-card">
      <div className="momento-destacado-image">
        <img src={momento1} alt="Ceremonia" />
      </div>
      <div className="momento-destacado-content">
        <h3 className="momento-destacado-title">Tu ceremonia soñada</h3>
        <p className="momento-destacado-description">
          Un espacio mágico donde cada promesa se convierte en un recuerdo eterno
        </p>
      </div>
    </div>
    
    <div className="momento-destacado-card">
      <div className="momento-destacado-image">
        <img src={momento2} alt="Recuerdos" />
      </div>
      <div className="momento-destacado-content">
        <h3 className="momento-destacado-title">Recuerdos eternos</h3>
        <p className="momento-destacado-description">
          Momentos que vivirán en tu corazón para siempre
        </p>
      </div>
    </div>
  </div>
</section>

{/* CTA Final */}
<section className="bodas-cta-section">
  <div 
    className="bodas-cta-background"
    style={{ backgroundImage: `url(${ctaBackground})` }}
  >
    <div className="bodas-cta-overlay"></div>
    <div className="bodas-cta-content">
      <h2 className="bodas-cta-title">Comienza a escribir tu historia</h2>
      <p className="bodas-cta-text">
        Tu día especial merece un lugar extraordinario
      </p>
      <button className="bodas-cta-button" onClick={handleReservacion}>
        Agenda tu visita
      </button>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bodas-footer">
        <div className="footer-content">
          <p className="footer-text">© 2024 La Capilla Hotel. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Bodas;