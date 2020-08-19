const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
});

function list(table) {
    return new Promise((resolve, reject) => {
        client.get(table, (error, data) => {
            if (error) {
                return reject(error);
            }

            let res = data || null;

            if (data) {
                res = JSON.parse(data);
            }

            return resolve(res);
        });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        client.get(table + '_' + id, (error, data) => {
            if (error) {
                return reject(error);
            }

            let res = data || null;

            if (data) {
                res = JSON.parse(data);
            }

            return resolve(res);
        });
    });
}

async function upsert(table, data) {
    let key = table;

    if (data && data.id) {
        key = key + '_' + data.id;
    }

    client.setex(key, 10, JSON.stringify(data));

    return true;
}

module.exports = {
    list,
    get,
    upsert,
};
