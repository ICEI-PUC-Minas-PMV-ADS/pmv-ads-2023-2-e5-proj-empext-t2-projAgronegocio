const unidadesModel = require('../models/unidadesModel');

const getAll = async (_req, res) => {
    const unidades = await unidadesModel.getAll();
    return res.status(200).json(unidades);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const unidades = await unidadesModel.getById(id);
    return res.status(200).json(unidades);
};

module.exports = {
    getAll,
    getById
};