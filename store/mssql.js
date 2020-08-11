const sql = require('mssql');

const config = require('../config');

const dbConfig = {
    server: config.mssql.server,
    port: config.mssql.port,
    user: config.mssql.user,
    password: config.mssql.password,
    database: config.mssql.database,
    options: config.mssql.options,
};

sql.on('error', (e) => {
    console.error('[db error]', error);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        handleConnection();
    }
    else {
        throw e;
    }
});

let connection;

function handleConnection() {
    sql.connect(dbConfig)
        .then((pool) => {
            connection = pool;

            console.log('[db connect]', 'DB connection success');
        })
        .catch((e) => {
            console.error('[db error]', error);
            setTimeout(handleConnection, 2000);
        });
}

function list() {
    return new Promise((resolve, rejected) => {
        connection.request().query('SELECT * FROM platzisocial.dbo.users WITH (NOLOCK)')
            .then((data) => {
                return resolve(data);
            })
            .catch((e) => {
                return rejected(e);
            });
    });
}

handleConnection();

module.exports = {
    list,
};
