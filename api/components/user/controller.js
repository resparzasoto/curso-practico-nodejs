const { nanoid } = require('nanoid')


const TABLE = 'user';

module.exports = (injectedStore = require('../../../store/dummy')) => {
    async function list() {
        return injectedStore.list(TABLE);
    }

    async function get(id) {
        return injectedStore.get(TABLE, id);
    }

    async function upsert(body) {
        const user = {
            id: '',
            name: body.name,
        };

        if (body.id) {
            user.id = body.id;
        }
        else {
            user.id = nanoid();
        }

        return injectedStore.upsert(TABLE, user);
    }

    async function remove (id) {
        return injectedStore.remove(TABLE, id);
    }

    return {
        list,
        get,
        upsert,
        remove,
    };
}