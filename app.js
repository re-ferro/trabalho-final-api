const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const userRoutes = require('./rest/routes/userRoutes');
const checkoutRoutes = require('./rest/routes/checkoutRoutes');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userRoutes);
app.use('/checkout', checkoutRoutes);

module.exports = app;