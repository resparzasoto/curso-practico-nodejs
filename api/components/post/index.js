const store = require('../../../store/mssql');
const controller = require('./controller');

module.exports = controller(store);
