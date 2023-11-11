const connection = require('./connection');

const getAll = async () => {
    const [unidades] = await connection.execute('SELECT * FROM unidades;');
    return unidades;
};

const getById = async (id) => {
    const [unidades] = await connection.execute('SELECT * FROM unidades WHERE id = ?', [id]);
    return unidades;
};

module.exports = {
    getAll,
    getById,
};