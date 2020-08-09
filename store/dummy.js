const db = {
    user: [
        {
            id: '1',
            name: 'Carlos'
        },
        {
            id: '2',
            name: 'Jesús'
        },
    ],
};

async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    const cols = await list(table);
    return cols.find(item => item.id === id);
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = [];
    }

    db[table].push(data);

    console.log(db);
}

async function remove(table, id) {
    return true;
}

async function query(table, q) {
    const col = await list(table);
    const keys = Object.keys(q);
    const key = keys[0];

    return col.find(item => item[key] === q[key]) || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
};
