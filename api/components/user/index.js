// const store = require('../../../store/mssql');
const config = require('../../../config');

let store;

if (config.remoteDB === true) {
    store = require('../../../store/remote-mssql');
} else {
    store = require('../../../store/mssql');
}

const controller = require('./controller');

module.exports = controller(store);
