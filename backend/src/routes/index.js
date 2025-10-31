const express = require('express');
const router = express.Router();

// Ruta de bienvenida de la API
router.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API del Hotel',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

// Ruta de ejemplo para usuarios
router.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Juan Pérez', email: 'juan@hotel.com', role: 'admin' },
    { id: 2, name: 'María García', email: 'maria@hotel.com', role: 'reception' }
  ]);
});

// Ruta de ejemplo para habitaciones
router.get('/rooms', (req, res) => {
  res.json([
    { id: 1, number: '101', type: 'single', price: 100, available: true },
    { id: 2, number: '102', type: 'double', price: 150, available: true }
  ]);
});

module.exports = router;