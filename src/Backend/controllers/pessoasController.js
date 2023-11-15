const pessoasModel = require('../models/pessoasModel');

const getAll = async (_req, res) => {
    const pessoas = await pessoasModel.getAll();
    return res.status(200).json(pessoas);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const pessoas = await pessoasModel.getById(id);
    return res.status(200).json(pessoas);
};

module.exports = {
    getAll,
    getById
};