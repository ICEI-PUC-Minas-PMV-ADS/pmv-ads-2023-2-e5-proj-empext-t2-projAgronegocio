const autenticacaoModel = require('../models/autenticacaoModel');
const autenticacaoController = require('./autenticacaoController');

jest.mock('../models/autenticacaoModel');

describe('Testes para autenticacaoController', () => {
  it('deve registrar um usuário com sucesso', async () => {
    autenticacaoModel.register.mockResolvedValue({ insertId: 1 });
    const req = { body: { name: 'John', email: 'john@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await autenticacaoController.register(req, res);

    expect(autenticacaoModel.register).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ insertId: 1 });
  });
});
