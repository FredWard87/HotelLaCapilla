import React, { useState } from 'react';
import './RoomCard.css';

const RoomCard = ({ room, onViewDetails, isRecommended = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Tomar solo las primeras 4 amenidades para mostrar
  const displayAmenities = room.amenities.slice(0, 4);

  return (
    <div 
      className={`room-card ${isRecommended ? 'recommended' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isRecommended && (
        <div className="recommended-badge">
          <span className="recommended-icon">⭐</span>
          Recomendada
        </div>
      )}
      
      <div className="room-image-container">
        <div className="image-overlay"></div>
        <img 
          src={room.images[0]} 
          alt={room.name}
          className={`room-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="room-badge">
          <span className="badge-icon">✨</span>
          Suite Premium
        </div>
        
        <div className="room-price-tag">
          <span className="price-symbol">$</span>
          <span className="price-amount">{room.price.toLocaleString()}</span>
          <span className="price-divider">|</span>
          <span className="price-period">noche</span>
        </div>

        <div className={`room-hover-content ${isHovered ? 'visible' : ''}`}>
          <button 
            className="info-btn"
            onClick={() => onViewDetails(room)}
          >
            <span className="btn-icon">ℹ️</span>
            Más Información
          </button>
        </div>
      </div>
      
      <div className="room-content">
        <div className="room-header">
          <h3 className="room-title">{room.name}</h3>
          <div className="room-meta">
            <span className="room-size">{room.size}</span>
            <span className="meta-divider">•</span>
            <span className="room-capacity">{room.capacity} Huéspedes</span>
          </div>
        </div>
        
        <div className="room-features">
          <div className="feature-item">
            <span className="feature-icon">🛏️</span>
            <span className="feature-text">{room.bedType}</span>
          </div>
        </div>
        
        {/* Amenidades de la habitación */}
        <div className="room-amenities">
          <h4 className="amenities-title">Servicios Incluidos</h4>
          <div className="amenities-grid">
            {displayAmenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <span className="amenity-icon">✓</span>
                <span className="amenity-text">{amenity}</span>
              </div>
            ))}
          </div>
          {room.amenities.length > 4 && (
            <div className="more-amenities">
              +{room.amenities.length - 4} servicios más
            </div>
          )}
        </div>
        
        <p className="room-excerpt">{room.description.substring(0, 120)}...</p>
        
        <button 
          className="info-cta-btn"
          onClick={() => onViewDetails(room)}
        >
          <span className="cta-text">MÁS INFORMACIÓN</span>
          <span className="cta-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default RoomCard;