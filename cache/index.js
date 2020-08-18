const express = require('express');

const config = require('../config');
const router = require('./network');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use('/', router);

app.listen(config.cacheService.port, () => {
    console.log('Servicio de Redis escuchando en el puerto', config.cacheService.port);
});
