const express = require('express');
const cors = require('cors');
const app = express();
const route = require("./src/router/route");
const { inject } = require("@vercel/analytics");

inject();  

app.use(cors());
app.use(route);

// Export app untuk Vercel
module.exports = app;
// Local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}