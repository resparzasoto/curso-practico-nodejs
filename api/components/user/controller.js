const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';

module.exports = (injectedStore = require('../../../store/mssql')) => {
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
            username: body.username,
            password: body.password,
        };

        if (body.id) {
            user.id = body.id;
        }
        else {
            user.id = nanoid();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: user.password,
            });
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
