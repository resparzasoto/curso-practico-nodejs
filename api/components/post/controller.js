const { nanoid } = require('nanoid');
const auth = require('../auth');
const { Table } = require('mssql');

const TABLE = 'posts';

module.exports = (injectedStore = require('../../../store/mssql')) => {
    async function list() {
        return injectedStore.list(TABLE);
    }

    return {
        list,
    };
}
