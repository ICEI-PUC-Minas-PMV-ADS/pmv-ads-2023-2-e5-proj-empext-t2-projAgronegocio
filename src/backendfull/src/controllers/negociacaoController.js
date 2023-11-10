const negociacaoModel = require('../models/negociacaoModel');

const getAll = async (_req, res) => {
    const negociacoes = await negociacaoModel.getAll();
    return res.status(200).json(negociacoes);
};

const getNegociacaoRecente = async (_req, res) => {
    const negociacoes = await negociacaoModel.getNegociacaoRecente();
    return res.status(200).json(negociacoes);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const negociacoes = await negociacaoModel.getById(id);
    return res.status(200).json(negociacoes);
};

const createNegociacao = async (req, res) => {
    const createdNegociacao = await negociacaoModel.createNegociacao(req.body);
    return res.status(201).json(createdNegociacao);
};

const deleteNegociacao = async (req, res) => {
    const { id } = req.params;

    await negociacaoModel.deleteNegociacao(id);
    return res.status(204).json();
};

const updateNegociacao = async (req, res) => {
    const { id } = req.params;

    await negociacaoModel.updateNegociacao(id, req.body);
    return res.status(204).json();
};

module.exports = {
    getAll,
    getNegociacaoRecente,
    getById,
    createNegociacao,
    deleteNegociacao,
    updateNegociacao
};