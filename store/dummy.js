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
    return cols.find(item => item.id === id);
}

const upsert = async (table, user) => {
    const foundUserIndex = db[table].findIndex(item => item.id === user.id);

    (foundUserIndex > -1) ? db[table][foundUserIndex] = user : db[table].push(user);

    return true;
}

const remove = async (table, id) => {
    const fountUserIndex = db[table].findIndex(item => item.id === id);

    if (fountUserIndex > -1) {
        db[table].splice(fountUserIndex, 1);
    }

    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
};