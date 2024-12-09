const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/dbConfig');
const authRoutes = require('./src/routes/authRoutes');
const speakerRoutes = require('./src/routes/speakerRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/speakers', speakerRoutes);
app.use('/bookings', bookingRoutes);

// Test Database Connection
sequelize.sync({ alter: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
