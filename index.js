const express = require('express');
const cors = require('cors');
const app = express();
const route = require("./src/router/route");
const { inject } = require("@vercel/analytics");

inject();  

// Konfigurasi CORS yang lebih lengkap
app.use(cors({
  origin: true,
  credentials: true
}));

// Trust proxy untuk Vercel
app.set('trust proxy', 1);

app.use(route);   // Gunakan route dari file router

// Penanganan error global (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Penanganan route yang tidak dikenal
app.all('*', (req, res) => {
  res.status(404).json({ 
    status: false,
    message: 'Route not found' 
  });
});

// Export app untuk Vercel
module.exports = app;

// Local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}