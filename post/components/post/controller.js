const TABLE = 'posts';

module.exports = (injectedStore = require('../../../store/mssql')) => {
    async function list() {
        return injectedStore.list(TABLE);
    }

    return {
        list,
    };
}
