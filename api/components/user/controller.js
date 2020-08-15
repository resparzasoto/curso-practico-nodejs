const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'users';

module.exports = (injectedStore = require('../../../store/mssql')) => {
    async function list() {
        return injectedStore.list(TABLE);
    }

    async function get(id) {
        return injectedStore.get(TABLE, id);
    }

    async function upsert(body) {
        let newRecord = false;
        const user = {
            id: '',
            username: body.username,
            name: body.name,
        };

        if (body.id) {
            user.id = body.id;
        }
        else {
            user.id = nanoid();
            newRecord = true;
        }

        if (body.username || body.password) {
            await auth.upsert({
                id: user.id,
                username: body.username,
                password: body.password,
            }, newRecord);
        }

        return injectedStore.upsert(TABLE, user, newRecord);
    }

    async function remove(id) {
        return injectedStore.remove(TABLE, id);
    }

    function follow(from, to) {
        return injectedStore.upsert(TABLE + '_follows', {
            user_from: from,
            user_to: to,
        }, true);
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow,
    };
}
