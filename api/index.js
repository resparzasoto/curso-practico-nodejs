const express = require('express');

const swaggerUi = require('swagger-ui-express');
const chalk = require('chalk');

const config = require('../config');
const user = require('./components/user/network');
const login = require('./components/auth/network');
const swaggerDoc = require('./swagger.json');
const errors = require('../network/errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
app.use('/api/user', user);
app.use('/api/auth', login);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
    if (config.api.environment === 'development') {
        console.log(chalk.green('[API]'), chalk.blueBright(`listen in http://localhost:${chalk.yellow(config.api.port)}`));;
    }
});
