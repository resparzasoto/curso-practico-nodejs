const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const error = require('../../../utils/error');

const TABLE = 'auth';
const SALT_OF_ENCRYPTION = 5;

module.exports = (injectedStore = require('../../../store/dummy')) => {
    async function login(username, password) {
        const data = await injectedStore.query(TABLE, { username: username });

        const areEquals = await bcrypt.compare(password, data.password);

        if (!areEquals) {
            throw new error('Information not valid', 400);
        }

        return auth.sign(data);
    }

    async function upsert(user) {
        const authData = {
            id: user.id,
        };

        if (user.username) {
            authData.username = user.username;
        }

        if (user.password) {
            authData.password = await bcrypt.hash(user.password, SALT_OF_ENCRYPTION);
        }

        return injectedStore.upsert(TABLE, authData);
    }


    return {
        login,
        upsert,
    };
};
