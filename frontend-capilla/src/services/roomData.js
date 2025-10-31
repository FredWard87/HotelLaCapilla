export const roomTypes = [
  {
    id: 1,
    name: "Habitación Standard",
    type: "standard",
    description: "Una experiencia de lujo en su expresión más refinada. Nuestra habitación Standard combina elegancia atemporal con comodidades modernas, creando un santuario personal de tranquilidad.",
    price: 2800,
    size: "35 m²",
    capacity: 2,
    bedType: "Cama Queen Size",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: [
      "WiFi Premium de Alta Velocidad",
      "Smart TV 4K Ultra HD",
      "Aire Acondicionado Inteligente",
      "Baño de Mármol con Amenidades",
      "Room Service 24 Horas",
      "Caja Fuerte Digital",
      "Secador de Pelo Profesional",
      "Minibar Curated",
      "Vista a los Jardines"
    ]
  },
  {
    id: 2,
    name: "Junior Suite Deluxe",
    type: "suite",
    description: "La suite que redefine el concepto de espacio y comodidad. Diseñada para quienes buscan una experiencia superior con detalles meticulosamente cuidados y servicios exclusivos.",
    price: 4500,
    size: "55 m²",
    capacity: 2,
    bedType: "Cama King Size",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587985064138-4e2d0edf9429?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: [
      "WiFi Premium de Alta Velocidad",
      "Smart TV 4K 55'",
      "Sistema de Climatización Inteligente",
      "Baño de Mármol con Tina",
      "Terraza Privada con Vista",
      "Minibar Gourmet",
      "Room Service 24 Horas",
      "Sistema de Sonido Surround",
      "Atención de Mayordomo"
    ]
  },
  {
    id: 3,
    name: "Suite Presidencial",
    type: "presidential",
    description: "El epítome del lujo y la sofisticación. Nuestra Suite Presidencial ofrece una experiencia incomparable con espacios generosos, detalles artesanales y servicios de clase mundial.",
    price: 8500,
    size: "95 m²",
    capacity: 4,
    bedType: "Cama King Size + Sala de Estar",
    images: [
      "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: [
      "WiFi Premium Empresarial",
      "Smart TV 4K 65' & 55'",
      "Sistema de Climatización por Zonas",
      "Jacuzzi Privado con Vista",
      "Terraza Exclusiva",
      "Minibar Premium",
      "Servicio de Mayordomo 24H",
      "Sistema de Entretenimiento",
      "Sala de Estar Independiente",
      "Vestidor Privado"
    ]
  }
];

// Simular disponibilidad
export const checkAvailability = (roomId, checkIn, checkOut) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        available: true, 
        message: "Suite disponible para las fechas seleccionadas",
        rate: roomTypes.find(room => room.id === roomId)?.price || 0
      });
    }, 800);
  });
};

// Simular procesamiento de pago
export const processPayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simular rechazo aleatorio (5% de probabilidad)
      if (Math.random() < 0.05) {
        reject({ 
          success: false, 
          message: "Transacción declinada. Por favor verifique los datos de su tarjeta o utilice otro método de pago." 
        });
      } else {
        resolve({
          success: true,
          bookingId: `LC-${Date.now()}`,
          transactionId: `TXN-${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
          message: "Pago procesado exitosamente. Su reserva ha sido confirmada.",
          timestamp: new Date().toISOString()
        });
      }
    }, 2500);
  });
};