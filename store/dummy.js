const db = {
    user: [
        { id: 1, name: 'Carlos' },
    ],
};

const list = (table) => {
    return db[table];
}

const get = (table, id) => {
    const dbTable = list(table);
    return dbTable.find(item => item.id === id) || null;
}

const upsert = (table, data) => {
    db[table].push(data);
    return true;
}

const remove = (table, id) => {
    db[table].splice(db[table].findIndex(item => item.id === id), 1);
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
};