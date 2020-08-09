const TABLE = 'auth';

module.exports = (injectedStore = require('../../../store/dummy')) => {
    function upsert(user) {
        const authData = {
            id: user.id,
        };

        if (user.username) {
            authData.username = user.username;
        }

        if (user.password) {
            authData.password = user.password;
        }

        return injectedStore.upsert(TABLE, authData);
    }

    return {
        upsert,
    };
};