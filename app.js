const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware для обробки JSON та CORS
app.use(express.json());
app.use(cors());

// Використання маршруту
app.use('/api', blogRoutes);

app.get('/', (req, res) => {
    res.send({ message: 'Hello WWW!' });
});

module.exports = app;
