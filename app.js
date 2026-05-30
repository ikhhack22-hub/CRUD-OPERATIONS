const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: "config.env" });
const cors = require('cors'); 

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => { console.error('❌ DB Error:', err); process.exit(1); });

app.use("/people", require("./routes/peopleRoutes"));

app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_ID', message: 'Provided ID format is invalid' }
    });
  }
  res.status(err.status || 500).json({
    success: false,
    error: { code: err.name || 'INTERNAL_ERROR', message: err.message || 'Server error' }
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
