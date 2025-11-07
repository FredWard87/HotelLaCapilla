// Importar imágenes locales
import img1 from '../assets2/juniorsuit/1.jpg';
import img2 from '../assets2/juniorsuit/2.jpg';
import img3 from '../assets2/juniorsuit/3.jpg';
import img4 from '../assets2/juniorsuit/4.png';
import img5 from '../assets2/juniorsuit/5.jpg';
import portada from '../assets2/juniorsuit/POTADAJUNIORSUITE.jpg';

import img6 from '../assets2/standar/1.png';
import img7 from '../assets2/standar/2.jpg';
import img8 from '../assets2/standar/3.jpg';
import img9 from '../assets2/standar/4.jpg';
import img10 from '../assets2/standar/5.jpg';
import img11 from '../assets2/standar/6.jpg';
import portadaStandar from '../assets2/standar/PORTADASTANDARD.jpg';

import img12 from '../assets2/mastersuit/1.png';
import img13 from '../assets2/mastersuit/2.png';
import img14 from '../assets2/mastersuit/3.jpg';
import img15 from '../assets2/mastersuit/4.jpg';
import img16 from '../assets2/mastersuit/5.jpg';
import img17 from '../assets2/mastersuit/6.jpg';
import img18 from '../assets2/mastersuit/7.jpg';
import img19 from '../assets2/mastersuit/8.jpg';
import portadaMastersuit from '../assets2/mastersuit/PORTADAMASTERSUITE.jpg';

// ========================== DATA DE HABITACIONES ==========================
export const roomTypes = [
  {
    id: 1,
    name: "STANDARD",
    type: "STANDARD",
    description:
      "Una experiencia de lujo en su expresión más refinada. Nuestra habitación Standard combina elegancia atemporal con comodidades modernas, creando un santuario personal de tranquilidad.",
    price: 2400,
    size: "25 m²",
    capacity: 2,
    bedType: "Cama Queen Size",
    images: [portadaStandar,img6, img7, img8, img9, img10, img11],
    amenities: [
      "Wifi",
      "House Keeping", 
      "Aire Acondicionado",
      "Smart Tv",
      "2 Pax",
      "25 m²"
    ],
  },
  {
    id: 2,
    name: "JUNIOR SUITE",
    type: "SUITE",
    description:
      "La suite que redefine el concepto de espacio y comodidad. Diseñada para quienes buscan una experiencia superior con detalles meticulosamente cuidados y servicios exclusivos.",
    price: 2800,
    size: "45 m²",
    capacity: 2,
    bedType: "Cama King Size",
    images: [portada,img1, img2, img3, img4, img5],
    amenities: [
      "Wifi",
      "House Keeping",
      "Aire Acondicionado", 
      "Smart Tv",
      "2 Pax",
      "45 m²"
    ],
  },
  {
    id: 3,
    name: "MASTER SUITE",
    type: "Master",
    description:
      "El epítome del lujo y la sofisticación. Nuestra Suite Presidencial ofrece una experiencia incomparable con espacios generosos, detalles artesanales y servicios de clase mundial.",
    price: 3600,
    size: "60 m²",
    capacity: 4,
    bedType: "Cama King Size + Sala de Estar",
    images: [portadaMastersuit,img12, img13, img14, img15, img16, img17, img18, img19],
    amenities: [
      "Wifi",
      "House Keeping",
      "Aire Acondicionado",
      "Smart Tv", 
      "4 Pax",
      "60 m²"
    ],
  },
];

// ========================== DISPONIBILIDAD ==========================
export const checkAvailability = (roomId, checkIn, checkOut) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        available: true,
        message: "Suite disponible para las fechas seleccionadas",
        rate: roomTypes.find((room) => room.id === roomId)?.price || 0,
      });
    }, 800);
  });
};

// ========================== PROCESAMIENTO DE PAGO ==========================
export const processPayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.05) {
        reject({
          success: false,
          message:
            "Transacción declinada. Por favor verifique los datos de su tarjeta o utilice otro método de pago.",
        });
      } else {
        resolve({
          success: true,
          bookingId: `LC-${Date.now()}`,
          transactionId: `TXN-${Math.random()
            .toString(36)
            .substr(2, 12)
            .toUpperCase()}`,
          message:
            "Pago procesado exitosamente. Su reserva ha sido confirmada.",
          timestamp: new Date().toISOString(),
        });
      }
    }, 2500);
  });
};