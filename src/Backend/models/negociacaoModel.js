const connection = require('./connection');

const getAll = async () => {
    const [negociacao] = await connection.execute('SELECT n.* , u.nome as nomeResponsavel , p.nome as nomePessoa FROM negociacao AS n INNER JOIN usuarios AS u ON n.id_usuario = u.id INNER JOIN pessoas AS p ON n.cliente_produtor = p.id ORDER BY data_lancamento DESC;');
    return negociacao;
};

const getById = async (id) => {
    const [negociacao] = await connection.execute('SELECT n.* , u.nome as nomeResponsavel , p.nome as nomePessoa FROM negociacao AS n INNER JOIN usuarios AS u ON n.id_usuario = u.id INNER JOIN pessoas AS p ON n.cliente_produtor = p.id WHERE n.id_usuario = ? ORDER BY data_lancamento DESC;', [id]);
    return negociacao;
};

const getNegociacaoRecente = async () => {
    const d = new Date();
    const newData = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    const query = 'SELECT n.* , u.nome as nomeResponsavel , p.nome as nomePessoa FROM negociacao AS n INNER JOIN usuarios AS u ON n.id_usuario = u.id INNER JOIN pessoas AS p ON n.cliente_produtor = p.id WHERE data_lancamento >= ? ORDER BY data_lancamento DESC';
    const [negociacaoRecente] = await connection.query(query, newData);
    return negociacaoRecente;
};

const createNegociacao = async (dados) => {
    const { cliente_produtor, tipo_operacao, valor_por_saca, quantidade_saca, data_vencimento, valor_total, unidade, id_usuario } = dados;
    const params = [cliente_produtor, tipo_operacao, valor_por_saca, quantidade_saca, data_vencimento, valor_total, unidade, id_usuario];
    const query = 'INSERT INTO negociacao (cliente_produtor, tipo_operacao, valor_por_saca, quantidade_saca, data_vencimento, valor_total, unidade, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [createdNegociacao] = await connection.query(query, params);
    return { insertId: createdNegociacao.insertId };
};

const deleteNegociacao = async (id) => {
    const [removedNegociacao] = await connection.execute('DELETE FROM negociacao WHERE id = ?', [id]);
    return removedNegociacao;
};

const updateNegociacao = async (id, dados) => {
    const { cliente_produtor, tipo_operacao, valor_por_saca, quantidade_saca, data_vencimento, valor_total, unidade, id_usuario } = dados;
    const params = [cliente_produtor, tipo_operacao, valor_por_saca, quantidade_saca, data_vencimento, valor_total, unidade, id_usuario, id];
    const query = 'UPDATE negociacao SET cliente_produtor = ?, tipo_operacao = ?, valor_por_saca = ?, quantidade_saca = ?, data_vencimento = ?, valor_total = ?, unidade = ?, id_usuario = ? WHERE id = ?';
    const [updatedNegociacao] = await connection.query(query, params);
    return updatedNegociacao;
};

module.exports = {
    getAll,
    getNegociacaoRecente,
    getById,
    createNegociacao,
    deleteNegociacao,
    updateNegociacao
};
