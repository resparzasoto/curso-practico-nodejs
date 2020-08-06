const express = require('express');
const chalk = require('chalk');

const config = require('../config');
const user = require('./components/user/network');

const app = express();

app.use(express.json());

//ROUTER
app.use('/api/user', user);

app.listen(config.api.port, () => {
    console.log(chalk.green('API escuchando en el puerto', chalk.yellow(config.api.port)));;
});