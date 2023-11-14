const unidadesController = require('./unidadesController');
const unidadesModel = require('../models/unidadesModel');

jest.mock('../models/unidadesModel');

describe('unidadesController', () => {
  it('getAll deve retornar uma lista de unidades', async () => {
    const unidades = [{ id: 1, nome: 'Unidade 1' }, { id: 2, nome: 'Unidade 2' }];
    unidadesModel.getAll.mockResolvedValue(unidades);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await unidadesController.getAll(req, res);

    expect(unidadesModel.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(unidades);
  });

  it('getById deve retornar uma única unidade com base no ID', async () => {
    const id = 1;
    const unidade = { id: 1, nome: 'Unidade 1' };
    unidadesModel.getById.mockResolvedValue(unidade);

    const req = { params: { id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await unidadesController.getById(req, res);

    expect(unidadesModel.getById).toHaveBeenCalledWith(id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(unidade);
  });
});
