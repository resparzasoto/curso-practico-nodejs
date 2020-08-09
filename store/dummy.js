const db = {
    user: [
        { id: '1', name: 'Carlos' },
        { id: '2', name: 'Jesús' },
    ],
};

async function list(table) {
    return db[table];
}

async function get(table, id) {
    const cols = await list(table);
    return cols.find(item => item.id === id);
}

async function upsert(table, user) {
    db[table].push(user);
}

async function remove(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
};