import React, { useState, useEffect, useRef } from 'react';
import '../css/RoomCard.css';

const RoomCard = ({ room, onViewDetails, isRecommended = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // 👇 Detecta cuando el elemento entra en pantalla (animación suave)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 💰 Formato del precio en MXN
  const formattedPrice = room.price.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });

  return (
    <div
      ref={cardRef}
      className={`room-card ${isRecommended ? 'recommended' : ''} ${isVisible ? 'visible' : 'reveal'}`}
    >
      <div className="room-image-container">
        <img
          src={room.images[0]}
          alt={room.name}
          className={`room-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Panel de información */}
      <div className="room-info-panel">
        <h3 className="room-title">
          {room.name.includes('Suite') ? room.name : `${room.name} `}
        </h3>

        <p className="room-capacity">{room.capacity} Adultos</p>
        <p className="room-size">{room.size}</p>

        <div className="price-display">
          <div className="price-group">
            <span className="price-value">{formattedPrice}</span>
          </div>
          <span className="price-period">POR NOCHE</span>
        </div>

        <button className="reserve-btn" onClick={() => onViewDetails(room)}>
          MÁS INFORMACIÓN
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
