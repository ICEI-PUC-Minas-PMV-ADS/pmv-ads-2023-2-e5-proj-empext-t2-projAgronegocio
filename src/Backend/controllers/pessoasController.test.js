const pessoasController = require('./pessoasController');
const pessoasModel = require('../models/pessoasModel');

jest.mock('../models/pessoasModel');

describe('pessoasController', () => {
  it('getAll deve retornar uma lista de pessoas', async () => {
    const pessoas = [{ id: 1, nome: 'Pessoa 1' }, { id: 2, nome: 'Pessoa 2' }];
    pessoasModel.getAll.mockResolvedValue(pessoas);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pessoasController.getAll(req, res);

    expect(pessoasModel.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(pessoas);
  });

  it('getById deve retornar uma única pessoa com base no ID', async () => {
    const id = 1;
    const pessoa = { id: 1, nome: 'Pessoa 1' };
    pessoasModel.getById.mockResolvedValue(pessoa);

    const req = { params: { id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pessoasController.getById(req, res);

    expect(pessoasModel.getById).toHaveBeenCalledWith(id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(pessoa);
  });
});
