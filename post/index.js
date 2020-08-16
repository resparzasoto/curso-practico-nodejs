const express = require('express');

const chalk = require('chalk');

const config = require('../config');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
    if (config.api.environment === 'development') {
        console.log(chalk.green('[Service POSTS]'), chalk.blueBright(`Listen in http://localhost:${chalk.yellow(config.post.port)}`));;
    }
});
