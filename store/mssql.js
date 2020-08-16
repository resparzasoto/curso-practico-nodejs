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

let pool;
let poolConnect;

sql.on('error', (e) => {
    console.error('[db error]', error);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        handleConnection();
    }
    else {
        throw e;
    }
});

function handleConnection() {
    pool = new sql.ConnectionPool(dbConfig)
    pool.connect()
        .then(result => {
            poolConnect = result;
        });
}

function list(table) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM ${table} WITH (NOLOCK)`;

        poolConnect.request()
            .query(stmt)
            .then((data) => {
                return resolve(data.recordset);
            })
            .catch((e) => {
                return reject(e);
            });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT *
                    FROM ${table} WITH (NOLOCK)
                    WHERE id = '${id}'`;

        poolConnect.request()
            .query(stmt)
            .then((data) => {
                return resolve(data.recordset);
            })
            .catch((e) => {
                return reject(e);
            });
    });
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        let stmt = '';
        let stmtColumns = '';
        let stmtValues = '';

        for (const [key, value] of Object.entries(data)) {
            stmtColumns += `${key},`;
            stmtValues += `'${value}',`;
        }

        stmtColumns = stmtColumns.slice(0, -1);
        stmtValues = stmtValues.slice(0, -1);

        stmt = `INSERT INTO ${table} (${stmtColumns}) VALUES (${stmtValues})`

        poolConnect.request()
            .query(stmt)
            .then(data => {
                return resolve(data.recordset);
            })
            .catch(e => {
                return reject(e);
            });
    });
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        let stmt = '';
        let stmtKeys = '';

        for (const [key, value] of Object.entries(data)) {
            stmtKeys += `${key} = '${value}',`;
        }

        stmtKeys = stmtKeys.slice(0, -1);

        stmt = `UPDATE ${table} SET ${stmtKeys} WHERE id = @input_id`;

        poolConnect.request()
            .input('input_id', data.id)
            .query(stmt)
            .then(data => {
                return resolve(data.recordset);
            })
            .catch(e => {
                return reject(e);
            });
    });
}

function upsert(table, data, newRecord = false) {
    if (newRecord) {
        return insert(table, data);
    }
    else {
        return update(table, data);
    }
}

function query(table, condition, join) {
    let stmt = '';
    let joinQuery = '';

    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `INNER JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    const entrie = Object.entries(condition)[0];
    const keyCondition = entrie[0];
    const valueCondition = entrie[1];

    stmt = `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.${keyCondition} = '${valueCondition}'`;

    return new Promise((resolve, reject) => {
        poolConnect.request()
            .query(stmt)
            .then(data => {
                return resolve(data.recordset[0]);
            })
            .catch(e => {
                return reject(e);
            });
    });
}

handleConnection();

module.exports = {
    list,
    get,
    upsert,
    query,
};
