// const store = require('../../../store/mssql');
const store = require('../../../store/remote-mssql');
const controller = require('./controller');

module.exports = controller(store);
