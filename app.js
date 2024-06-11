const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authenticateToken = require('./middleware/auth');
const initializeData = require('./config/initializeData');

dotenv.config();

const app = express();

// Connexion à la base de données
connectDB().then(() => {
   
    // Initialisation des données de test
    initializeData();
});

app.use(express.json());

// Routes
app.use('/api/stations', authenticateToken, require('./routes/stationRoutes'));
app.use('/api/cities', authenticateToken, require('./routes/cityRoutes'));
app.use('/api/lines', authenticateToken, require('./routes/lineRoutes'));
app.use('/users', require('./routes/userRoutes'));

module.exports = app;
