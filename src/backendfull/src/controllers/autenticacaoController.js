const autenticacaoModel = require('../models/autenticacaoModel');

const register = async (req, res) => {
    const register = await autenticacaoModel.register(req.body);
    return res.status(200).json(register);
};

const login = async (req, res) => {
    const login = await autenticacaoModel.login(req.body);
    return res.status(200).json(login);
};


module.exports = {
    register,
    login
};