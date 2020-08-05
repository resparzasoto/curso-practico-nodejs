const store = require('../../../store/dummy');

const TABLE_USER = 'user';

const list = () => {
    return store.list(TABLE_USER);
}

const remove = (id) => {
    return store.remove(TABLE_USER, id);
}

module.exports = {
    list,
    remove,
};