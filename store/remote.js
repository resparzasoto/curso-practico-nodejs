const request = require('request');

function createRemoteDB(host, port) {
    const baseUrlApi = `http://${host}:${port}`;

    function list(table) {
        return req('GET', table);
    }

    function get(table, id) {
    }

    function upsert(table, data) {
    }

    function query(table, query, join) {
    }

    function req(verb, table, data) {
        let url = `${baseUrlApi}/${table}`;
        let body = '';

        return new Promise((resolve, reject) => {
            request({
                verb,
                headers: {
                    'content-type': 'application/json',
                },
                url,
                body,
            }, (error, req, body) => {
                if (error) {
                    console.error('Error con la base de datos remota', error);
                    return reject(error.message);
                }

                const response = JSON.parse(body);
                return resolve(response);
            });
        });
    }

    return {
        list,
    }
}

module.exports = createRemoteDB;
