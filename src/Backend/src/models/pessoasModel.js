const connection = require('./connection');

const getAll = async () => {
    const [pessoas] = await connection.execute('SELECT * FROM pessoas;');
    return pessoas;
};

const getById = async (id) => {
    const [pessoas] = await connection.execute('SELECT * FROM pessoas WHERE id = ?', [id]);
    return pessoas;
};

module.exports = {
    getAll,
    getById,
};