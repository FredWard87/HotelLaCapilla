// components/BookingModal.js
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import '../css/BookingModal.css';
import { roomTypes } from '../../services/roomData';
import { useAnimation } from '../../context/AnimationContext'; // 👈 IMPORTAR

const BookingModal = ({ room, isOpen, onClose, onBook }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
  const [imageOrientations, setImageOrientations] = useState({});
  const [loadedImages, setLoadedImages] = useState(new Set());

  // 🚀 USAR EL CONTEXT DE ANIMACIONES
  const { pauseAnimations, resumeAnimations } = useAnimation();

  // 🚀 FUNCIÓN OPTIMIZADA PARA DETECTAR ORIENTACIÓN
  const getImageOrientation = useCallback((imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function() {
        const orientation = this.width > this.height ? 'horizontal' : 'vertical';
        resolve(orientation);
      };
      img.onerror = () => resolve('vertical');
      img.src = imageUrl;
    });
  }, []);

  // 🚀 EFECTO OPTIMIZADO DE INICIALIZACIÓN CON CONTROL DE ANIMACIONES
  useEffect(() => {
    if (isOpen && room) {
      // 🚀 BLOQUEAR SCROLL Y PAUSAR ANIMACIONES
      document.body.style.overflow = 'hidden';
      pauseAnimations(); // 👈 PAUSAR ANIMACIONES DEL HOME

      setCurrentStep(1);
      setCurrentRoom(room);
      setSelectedImage(0);
      setIsFullscreen(false);
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
      setLoadedImages(new Set([0]));

      // Detectar orientaciones de imágenes
      const detectOrientations = async () => {
        const orientations = {};
        if (room.images) {
          for (let i = 0; i < Math.min(room.images.length, 10); i++) {
            try {
              const orientation = await getImageOrientation(room.images[i]);
              orientations[i] = orientation;
            } catch (error) {
              orientations[i] = 'vertical';
            }
          }
          setImageOrientations(orientations);
        }
      };
      
      detectOrientations();
    } else {
      // 🚀 RESTAURAR SCROLL Y REANUDAR ANIMACIONES
      document.body.style.overflow = 'unset';
      resumeAnimations(); // 👈 REANUDAR ANIMACIONES DEL HOME
    }
    
    return () => {
      // 🚀 CLEANUP: ASEGURAR QUE TODO SE RESTAURE
      document.body.style.overflow = 'unset';
      resumeAnimations(); // 👈 REANUDAR ANIMACIONES POR SI ACASO
    };
  }, [isOpen, room, getImageOrientation, pauseAnimations, resumeAnimations]);

  // 🚀 MANEJO OPTIMIZADO DE CAMBIO DE IMAGEN
  const handleImageChange = useCallback((index) => {
    setSelectedImage(index);
    if (currentRoom?.images) {
      setLoadedImages(prev => new Set([...prev, index]));
    }
  }, [currentRoom]);

  // 🚀 FUNCIÓN PARA CLASE DE ORIENTACIÓN
  const getImageOrientationClass = useCallback((index) => {
    return imageOrientations[index] === 'horizontal' ? 'horizontal' : '';
  }, [imageOrientations]);

  // 🚀 HOOKS DE MEMOIZACIÓN OPTIMIZADOS
  const calculateNights = useMemo(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  }, [checkIn, checkOut]);

  const calculateTotal = useMemo(() => {
    return calculateNights * (currentRoom?.price || 0);
  }, [calculateNights, currentRoom]);

  const tax = useMemo(() => calculateTotal * 0.16, [calculateTotal]);
  const finalTotal = useMemo(() => calculateTotal + tax, [calculateTotal, tax]);

  // 🚀 HABITACIONES RECOMENDADAS OPTIMIZADAS
  const recommendedRooms = useMemo(() => {
    if (!currentRoom) return [];
    return roomTypes.filter(r => r.id !== currentRoom.id).slice(0, 2);
  }, [currentRoom]);

  // 🚀 DETECTAR SI HAY MÁS DE 6 IMÁGENES PARA SCROLL
  const hasManyImages = currentRoom?.images && currentRoom.images.length > 6;

  const formatCurrency = useCallback((value) =>
    value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), []);

  // 🚀 FUNCIONES PRINCIPALES OPTIMIZADAS
  const handleNextStep = useCallback(() => {
    if (currentStep === 1 && (!checkIn || !checkOut)) {
      alert('Por favor selecciona las fechas de tu estadía');
      return;
    }
    if (currentStep === 2 && (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email)) {
      alert('Por favor completa tu información personal');
      return;
    }
    setCurrentStep(prev => prev + 1);
  }, [currentStep, checkIn, checkOut, guestInfo]);

  const handlePreviousStep = useCallback(() => setCurrentStep(prev => prev - 1), []);

  const handlePayment = useCallback(async () => {
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
        nights: calculateNights,
        total: calculateTotal,
        timestamp: new Date().toISOString()
      };
      await onBook(bookingData);
    } catch (error) {
      console.error('Error en el pago:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [paymentInfo, currentRoom, checkIn, checkOut, guestInfo, calculateNights, calculateTotal, onBook]);

  const handleRoomChange = useCallback((newRoom) => {
    setCurrentRoom(newRoom);
    setSelectedImage(0);
    setIsFullscreen(false);
    setCheckIn('');
    setCheckOut('');
    setCurrentStep(1);
    setLoadedImages(new Set([0]));

    // Detectar orientaciones para la nueva habitación
    const detectOrientations = async () => {
      const orientations = {};
      if (newRoom.images) {
        for (let i = 0; i < Math.min(newRoom.images.length, 10); i++) {
          try {
            const orientation = await getImageOrientation(newRoom.images[i]);
            orientations[i] = orientation;
          } catch (error) {
            orientations[i] = 'vertical';
          }
        }
        setImageOrientations(orientations);
      }
    };
    
    detectOrientations();
  }, [getImageOrientation]);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const handleNextImage = useCallback(() => {
    const nextIndex = (selectedImage + 1) % currentRoom.images.length;
    handleImageChange(nextIndex);
  }, [selectedImage, currentRoom, handleImageChange]);

  const handlePrevImage = useCallback(() => {
    const prevIndex = (selectedImage - 1 + currentRoom.images.length) % currentRoom.images.length;
    handleImageChange(prevIndex);
  }, [selectedImage, currentRoom, handleImageChange]);

  // 🚀 MANEJO DE TECLADO OPTIMIZADO
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      
      if (e.key === 'Escape') {
        handleCloseFullscreen();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handleCloseFullscreen, handleNextImage, handlePrevImage]);

  // 🚀 MANEJO DE CARGA DE IMÁGENES
  const handleImageLoad = useCallback((index, type = 'main') => {
    setLoadedImages(prev => new Set([...prev, index]));
    
    // Detectar orientación si no está definida
    if (!imageOrientations[index] && currentRoom?.images[index]) {
      getImageOrientation(currentRoom.images[index]).then(orientation => {
        setImageOrientations(prev => ({
          ...prev,
          [index]: orientation
        }));
      });
    }
  }, [imageOrientations, currentRoom, getImageOrientation]);

  if (!isOpen || !room || !currentRoom) return null;

  // 🚀 RENDER OPTIMIZADO
  return (
    <>
      {/* MODAL PRINCIPAL */}
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

            <button className="close-btn" onClick={onClose}><span>×</span></button>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="modal-content">
            {currentStep === 1 && (
              <>
                <div className="step-content">
                  {/* 🚀 GALERÍA OPTIMIZADA */}
                  <div className="suite-gallery">
                    <div className="main-image-container" onClick={handleFullscreen}>
                      <img
                        src={currentRoom.images[selectedImage]}
                        alt={currentRoom.name}
                        className={`main-image ${getImageOrientationClass(selectedImage)} ${
                          loadedImages.has(selectedImage) ? 'loaded' : 'loading'
                        }`}
                        onLoad={() => handleImageLoad(selectedImage, 'main')}
                        loading="eager"
                        decoding="async"
                      />
                      <div className="image-counter">
                        {selectedImage + 1} / {currentRoom.images.length}
                      </div>
                      <div className="fullscreen-indicator">
                        <span className="fullscreen-icon">⛶</span>
                        Click para pantalla completa
                      </div>
                    </div>
                    
                    {/* 🚀 MINIATURAS CON SCROLL */}
                    <div className={`thumbnail-strip ${hasManyImages ? 'many-images' : ''}`}>
                      {currentRoom.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${currentRoom.name} ${index + 1}`}
                          className={`thumbnail ${selectedImage === index ? 'active' : ''} ${
                            loadedImages.has(index) ? 'loaded' : 'loading'
                          }`}
                          onClick={() => handleImageChange(index)}
                          onLoad={() => handleImageLoad(index, 'thumbnail')}
                          loading="lazy"
                          decoding="async"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="booking-details">
                    <div className="suite-header">
                      <h1 className="suite-title">{currentRoom.name}</h1>
                      <div className="suite-price">
                        <span className="price-amount">{formatCurrency(currentRoom.price)}</span>
                        <span className="price-period"> POR NOCHE</span>
                      </div>
                    </div>

                    <div className="luxury-divider"></div>

                    <div className="date-selection-section">
                      <h3 className="section-title">SELECCIONA TUS FECHAS</h3>

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

                      {calculateNights > 0 && (
                        <div className="luxury-summary">
                          <h4 className="summary-title">RESUMEN DE ESTADIA</h4>
                          <div className="summary-items">
                            <div className="summary-item">
                              <span>{formatCurrency(currentRoom.price)} × {calculateNights} noches</span>
                              <span>{formatCurrency(calculateTotal)}</span>
                            </div>
                            <div className="summary-item">
                              <span>IMPUESTOS Y SERVICIOS</span>
                              <span>{formatCurrency(tax)}</span>
                            </div>
                            <div className="summary-total">
                              <span>Total</span>
                              <span>{formatCurrency(finalTotal)}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <button className="luxury-next-btn" onClick={handleNextStep}>
                        <span className="btn-text">CONTINUAR CON LA RESERVA</span>
                        <span className="btn-arrow">→</span>
                      </button>
                    </div>

                    {/* SERVICIOS INCLUIDOS */}
                    <div className="services-included-section">
                      <div className="services-header">
                        <div className="services-ornament-left"></div>
                        <h3 className="services-title">Servicios Incluidos</h3>
                        <div className="services-ornament-right"></div>
                      </div>
                      
                      <div className="services-grid-minimal">
                        {currentRoom.amenities.map((amenity, index) => (
                          <div key={index} className="service-item-minimal">
                            <div className="service-icon-minimal">
                              {getAmenityIcon(amenity)}
                            </div>
                            <span className="service-name-minimal">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* HABITACIONES RECOMENDADAS */}
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
                          <img 
                            src={recRoom.images[0]} 
                            alt={recRoom.name} 
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="recommended-room-info">
                            <h4>{recRoom.name}</h4>
                            <div className="recommended-meta">
                              <span>{recRoom.size}</span>
                              <span>•</span>
                              <span>{recRoom.capacity} HUÉSPEDES</span>
                            </div>
                            <div className="recommended-price">
                              {formatCurrency(recRoom.price)} / noche
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* PASO 2 - HUÉSPED */}
            {currentStep === 2 && (
              <div className="step-content guest-step">
                <h3 className="section-title">INFORMACIÓN DEL HUESPED</h3>
                <div className="guest-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="input-label">Nombre</label>
                      <input
                        type="text"
                        value={guestInfo.firstName}
                        onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                        className="luxury-input"
                        placeholder="Ingresa tu nombre"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Apellido</label>
                      <input
                        type="text"
                        value={guestInfo.lastName}
                        onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                        className="luxury-input"
                        placeholder="Ingresa tu apellido"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="input-label">Email</label>
                      <input
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                        className="luxury-input"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Teléfono</label>
                      <input
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                        className="luxury-input"
                        placeholder="+52 123 456 7890"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="input-label">Solicitudes Especiales (Opcional)</label>
                    <textarea
                      value={guestInfo.specialRequests}
                      onChange={(e) => setGuestInfo({...guestInfo, specialRequests: e.target.value})}
                      className="luxury-textarea"
                      placeholder="¿Alguna petición especial para tu estancia?"
                      rows="4"
                    />
                  </div>
                </div>
                <div className="step-actions">
                  <button className="luxury-back-btn" onClick={handlePreviousStep}>
                    ← Anterior
                  </button>
                  <button className="luxury-next-btn" onClick={handleNextStep}>
                    <span className="btn-text">CONTINUAR</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* PASO 3 - PAGO */}
            {currentStep === 3 && (
              <div className="step-content payment-step">
                <h3 className="section-title">Información de Pago</h3>
                <div className="payment-form">
                  <div className="form-group">
                    <label className="input-label">Nombre en la Tarjeta</label>
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                      className="luxury-input"
                      placeholder="Como aparece en la tarjeta"
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-label">Número de Tarjeta</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      className="luxury-input"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="input-label">Fecha de Expiración</label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        className="luxury-input"
                        placeholder="MM/AA"
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">CVV</label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        className="luxury-input"
                        placeholder="123"
                        maxLength="4"
                      />
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
                      <span>{new Date(checkIn).toLocaleDateString('es-MX')}</span>
                    </div>
                    <div className="summary-item">
                      <span>Check-out:</span>
                      <span>{new Date(checkOut).toLocaleDateString('es-MX')}</span>
                    </div>
                    <div className="summary-item">
                      <span>Noches:</span>
                      <span>{calculateNights}</span>
                    </div>
                    <div className="summary-item">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(calculateTotal)}</span>
                    </div>
                    <div className="summary-item">
                      <span>Impuestos:</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="summary-total-luxury">
                      <span>Total a Pagar:</span>
                      <span>{formatCurrency(finalTotal)}</span>
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
                      `Confirmar Pago - ${formatCurrency(finalTotal)}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PANTALLA COMPLETA */}
      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
          <div className="fullscreen-container" onClick={(e) => e.stopPropagation()}>
            <button className="fullscreen-close-btn" onClick={handleCloseFullscreen}>
              <span>×</span>
            </button>
            
            <button className="fullscreen-nav-btn prev-btn" onClick={handlePrevImage}>
              ‹
            </button>
            
            <div className="fullscreen-image-container">
              <img
                src={currentRoom.images[selectedImage]}
                alt={currentRoom.name}
                className="fullscreen-image"
              />
              <div className="fullscreen-counter">
                {selectedImage + 1} / {currentRoom.images.length}
              </div>
            </div>
            
            <button className="fullscreen-nav-btn next-btn" onClick={handleNextImage}>
              ›
            </button>

            <div className="fullscreen-thumbnails">
              {currentRoom.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${currentRoom.name} ${index + 1}`}
                  className={`fullscreen-thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => handleImageChange(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Función para obtener iconos
const getAmenityIcon = (amenity) => {
  const lowerAmenity = amenity.toLowerCase();
  
  if (lowerAmenity.includes('wifi')) return '📶';
  if (lowerAmenity.includes('tv') || lowerAmenity.includes('televisión')) return '📺';
  if (lowerAmenity.includes('aire') || lowerAmenity.includes('climatización')) return '❄️';
  if (lowerAmenity.includes('house keeping') || lowerAmenity.includes('limpieza')) return '🧹';
  if (lowerAmenity.includes('pax') || lowerAmenity.includes('huésped')) return '👥';
  if (lowerAmenity.includes('m²') || lowerAmenity.includes('metros')) return '📐';
  
  return '✨';
};

export default BookingModal;