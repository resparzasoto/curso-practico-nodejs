const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.mssqlService.host, config.mssqlService.port);
