const TABLE_USER = 'user';

module.exports = (injectedStore = require('../../../store/dummy')) => {
    const list = async () => {
        return injectedStore.list(TABLE_USER);
    }

    const get = async (id) => {
        return injectedStore.get(TABLE_USER, id);
    }

    const remove = async (id) => {
        return injectedStore.remove(TABLE_USER, id);
    }

    return {
        list,
        get,
        remove,
    };
}