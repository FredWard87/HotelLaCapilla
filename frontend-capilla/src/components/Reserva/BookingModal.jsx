import React, { useState, useEffect } from 'react';
import '../css/BookingModal.css';
import { roomTypes } from '../../services/roomData';

const BookingModal = ({ room, isOpen, onClose, onBook }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    if (isOpen && room) {
      document.body.style.overflow = 'hidden';
      setCurrentStep(1);
      setCurrentRoom(room);
      setSelectedImage(0);
      // Reset form
      setCheckIn('');
      setCheckOut('');
      setGuestInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: ''
      });
      setPaymentInfo({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
      });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, room]);

  // Si no está abierto o no hay habitación, no renderizar
  if (!isOpen || !room || !currentRoom) return null;

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * currentRoom.price;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!checkIn || !checkOut)) {
      alert('Por favor selecciona las fechas de tu estadía');
      return;
    }
    if (currentStep === 2 && (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email)) {
      alert('Por favor completa tu información personal');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handlePayment = async () => {
    if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.cardName) {
      alert('Por favor completa todos los datos de la tarjeta');
      return;
    }

    setIsProcessing(true);
    try {
      const bookingData = {
        room: currentRoom,
        checkIn,
        checkOut,
        guestInfo,
        paymentInfo,
        nights: calculateNights(),
        total: calculateTotal(),
        timestamp: new Date().toISOString()
      };
      
      await onBook(bookingData);
    } catch (error) {
      console.error('Error en el pago:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const nights = calculateNights();
  const total = calculateTotal();
  const tax = total * 0.16;
  const finalTotal = total + tax;

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  // Obtener habitaciones recomendadas (excluyendo la actual)
  const recommendedRooms = roomTypes.filter(recRoom => recRoom.id !== currentRoom.id).slice(0, 2);

  const handleRoomChange = (newRoom) => {
    setCurrentRoom(newRoom);
    setSelectedImage(0);
    setCheckIn('');
    setCheckOut('');
    setCurrentStep(1);
  };

  // Agrupar servicios por categorías para mejor presentación
  const getServiceIcon = (service) => {
    if (service.includes('WiFi') || service.includes('Internet')) return '📶';
    if (service.includes('TV') || service.includes('Entretenimiento')) return '📺';
    if (service.includes('Aire') || service.includes('Climatización')) return '❄️';
    if (service.includes('Baño') || service.includes('Tina') || service.includes('Jacuzzi')) return '🛁';
    if (service.includes('Room Service') || service.includes('Servicio')) return '🛎️';
    if (service.includes('Minibar')) return '🧊';
    if (service.includes('Vista') || service.includes('Terraza')) return '🌅';
    if (service.includes('Sonido') || service.includes('Música')) return '🔊';
    if (service.includes('Mayordomo')) return '👔';
    if (service.includes('Caja')) return '🔒';
    if (service.includes('Secador')) return '💇';
    return '✨';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="luxury-brand">
            <div className="brand-divider"></div>
            <span className="brand-text">LA CAPILLA</span>
            <div className="brand-divider"></div>
          </div>
          
          <div className="steps-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-circle">1</div>
              <span className="step-label">Fechas</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-circle">2</div>
              <span className="step-label">Huésped</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <span className="step-label">Pago</span>
            </div>
          </div>
          
          <button className="close-btn" onClick={onClose}>
            <span>×</span>
          </button>
        </div>

        <div className="modal-content">
          {/* Paso 1: Selección de Fechas */}
          {currentStep === 1 && (
            <>
              <div className="step-content">
                <div className="suite-gallery">
                  <div className="main-image-container">
                    <img 
                      src={currentRoom.images[selectedImage]} 
                      alt={currentRoom.name}
                      className="main-image"
                    />
                    <div className="image-counter">
                      {selectedImage + 1} / {currentRoom.images.length}
                    </div>
                  </div>
                  <div className="thumbnail-strip">
                    {currentRoom.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${currentRoom.name} ${index + 1}`}
                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                </div>

                <div className="booking-details">
                  <div className="suite-header">
                    <h1 className="suite-title">{currentRoom.name}</h1>
                    <div className="suite-price">
                      <span className="price-amount">${currentRoom.price.toLocaleString()}</span>
                      <span className="price-period"> por noche</span>
                    </div>
                  </div>

                  <div className="luxury-divider"></div>

                   <div className="date-selection-section">
                    <h3 className="section-title">Selecciona tus fechas</h3>
                    
                    <div className="date-inputs-luxury">
                      <div className="date-input-group">
                        <label className="input-label">CHECK-IN</label>
                        <div className="input-container">
                          <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="luxury-date-input"
                          />
                          <span className="input-icon">📅</span>
                        </div>
                      </div>
                      
                      <div className="date-input-group">
                        <label className="input-label">CHECK-OUT</label>
                        <div className="input-container">
                          <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                            className="luxury-date-input"
                          />
                          <span className="input-icon">📅</span>
                        </div>
                      </div>
                    </div>

                    {nights > 0 && (
                      <div className="luxury-summary">
                        <h4 className="summary-title">Resumen de Estadia</h4>
                        <div className="summary-items">
                          <div className="summary-item">
                            <span>{currentRoom.price.toLocaleString()} × {nights} noches</span>
                            <span>${total.toLocaleString()}</span>
                          </div>
                          <div className="summary-item">
                            <span>Impuestos & Servicios</span>
                            <span>${tax.toLocaleString()}</span>
                          </div>
                          <div className="summary-total">
                            <span>Total</span>
                            <span>${finalTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <button className="luxury-next-btn" onClick={handleNextStep}>
                      <span className="btn-text">CONTINUAR CON LA RESERVA</span>
                      <span className="btn-arrow">→</span>
                    </button>
                  {/* Sección de Servicios Elegante */}

                  {/* Sección de Servicios Elegante */}
                  <div className="elegant-services-section">
                    <div className="services-header">
                      <div className="services-ornament-left"></div>
                      <h3 className="services-title">SERVICIOS INCLUIDOS</h3>
                      <div className="services-ornament-right"></div>
                    </div>
                    
                    <div className="elegant-services-grid">
                      {currentRoom.amenities.map((service, index) => (
                        <div key={index} className="elegant-service-card">
                          <div className="service-icon-wrapper">
                            <span className="service-icon">{getServiceIcon(service)}</span>
                          </div>
                          <div className="service-content">
                            <h4 className="service-name">{service.split(' ').slice(0, 3).join(' ')}</h4>
                            <p className="service-description">{service}</p>
                          </div>
                          <div className="service-badge">
                            <span className="badge-text">INCLUIDO</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="luxury-divider"></div>

                
                  </div>
                </div>
              </div>

              {/* Sección de Recomendaciones */}
              {recommendedRooms.length > 0 && (
                <div className="recommended-rooms-section">
                  <div className="recommended-header">
                    <h3 className="recommended-title">Otras Suites que te pueden interesar</h3>
                    <p className="recommended-subtitle">Descubre más opciones exclusivas</p>
                  </div>
                  <div className="recommended-rooms-grid">
                    {recommendedRooms.map(recRoom => (
                      <div 
                        key={recRoom.id} 
                        className="recommended-room-card"
                        onClick={() => handleRoomChange(recRoom)}
                      >
                        <img src={recRoom.images[0]} alt={recRoom.name} />
                        <div className="recommended-room-info">
                          <h4>{recRoom.name}</h4>
                          <div className="recommended-meta">
                            <span>{recRoom.size}</span>
                            <span>•</span>
                            <span>{recRoom.capacity} Huéspedes</span>
                          </div>
                          <div className="recommended-price">
                            ${recRoom.price.toLocaleString()} / noche
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Paso 2: Información del Huésped */}
          {currentStep === 2 && (
            <div className="step-content guest-step">
              <div className="guest-info-section">
                <div className="section-header">
                  <h2 className="section-title">Información del Huésped</h2>
                  <p className="section-description">
                    Proporciona tus datos para personalizar tu experiencia
                  </p>
                </div>

                <div className="luxury-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        value={guestInfo.firstName}
                        onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                        placeholder="Tu nombre"
                        className="luxury-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Apellido</label>
                      <input
                        type="text"
                        value={guestInfo.lastName}
                        onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                        placeholder="Tu apellido"
                        className="luxury-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Correo Electrónico</label>
                      <input
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                        placeholder="tu@email.com"
                        className="luxury-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Teléfono</label>
                      <input
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                        placeholder="+52 123 456 7890"
                        className="luxury-input"
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Solicitudes Especiales</label>
                    <textarea
                      value={guestInfo.specialRequests}
                      onChange={(e) => setGuestInfo({...guestInfo, specialRequests: e.target.value})}
                      placeholder="Comparte cualquier preferencia especial para hacer tu estancia inolvidable..."
                      className="luxury-textarea"
                      rows="4"
                    />
                  </div>
                </div>

                <div className="step-actions">
                  <button className="luxury-back-btn" onClick={handlePreviousStep}>
                    ← Anterior
                  </button>
                  <button className="luxury-next-btn" onClick={handleNextStep}>
                    <span className="btn-text">Continuar al Pago</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: Información de Pago */}
          {currentStep === 3 && (
            <div className="step-content payment-step">
              <div className="payment-section">
                <div className="section-header">
                  <h2 className="section-title">Información de Pago</h2>
                  <p className="section-description">
                    Completa los datos de tu tarjeta para finalizar la reserva
                  </p>
                </div>

                <div className="payment-form-luxury">
                  <div className="form-group full-width">
                    <label className="form-label">Nombre en la Tarjeta</label>
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                      placeholder="Como aparece en la tarjeta"
                      className="luxury-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Número de Tarjeta</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: formatCardNumber(e.target.value)})}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="luxury-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Fecha de Expiración</label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: formatExpiryDate(e.target.value)})}
                        placeholder="MM/AA"
                        maxLength="5"
                        className="luxury-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value.replace(/\D/g, '')})}
                        placeholder="123"
                        maxLength="3"
                        className="luxury-input"
                      />
                    </div>
                  </div>

                  <div className="security-badge">
                    <div className="lock-icon">🔒</div>
                    <div className="security-text">
                      <strong>Transacción Segura</strong>
                      <span>Tus datos están protegidos con encriptación SSL de 256-bit</span>
                    </div>
                  </div>
                </div>

                <div className="booking-summary-luxury">
                  <h3 className="summary-title">Resumen de la Reserva</h3>
                  <div className="summary-details">
                    <div className="summary-item">
                      <span>Suite:</span>
                      <span>{currentRoom.name}</span>
                    </div>
                    <div className="summary-item">
                      <span>Check-in:</span>
                      <span>{new Date(checkIn).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="summary-item">
                      <span>Check-out:</span>
                      <span>{new Date(checkOut).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="summary-item">
                      <span>Duración:</span>
                      <span>{nights} {nights === 1 ? 'noche' : 'noches'}</span>
                    </div>
                    <div className="summary-total-luxury">
                      <span>Total a Pagar:</span>
                      <span>${finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="step-actions">
                  <button className="luxury-back-btn" onClick={handlePreviousStep}>
                    ← Anterior
                  </button>
                  <button 
                    className="luxury-pay-btn"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="luxury-spinner"></div>
                        Procesando Pago...
                      </>
                    ) : (
                      `Confirmar Pago - $${finalTotal.toLocaleString()}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;