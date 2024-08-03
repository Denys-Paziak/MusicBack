const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const promocodeRoutes = require('./routes/promocodeRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', blogRoutes);
app.use('/', portfolioRoutes);
app.use('/', promocodeRoutes);

app.get('/', (req, res) => {
    res.send({ message: 'Hello WWW!' });
});

module.exports = app;
