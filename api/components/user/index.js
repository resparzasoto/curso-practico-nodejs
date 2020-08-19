const config = require('../../../config');

let store;
let cache;

if (config.remoteDB === true) {
    store = require('../../../store/remote-mssql');
    cache = require('../../../store/remote-cache');
} else {
    store = require('../../../store/mssql');
    cache = require('../../../store/redis');
}

const controller = require('./controller');

module.exports = controller(store, cache);
