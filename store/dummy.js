const db = {
    user: [
        { id: '1', name: 'Carlos' },
        { id: '2', name: 'Jesús' },
    ],
};

const list = async (table) => {
    return db[table];
}

const get = async (table, id) => {
    const cols = await list(table);
    return cols.filter(item => item.id === id);
}

const upsert = async (table, data) => {
    db[table].push(data);
    return true;
}

const remove = async (table, id) => {
    db[table].splice(db[table].findIndex(item => item.id === id), 1);
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
};