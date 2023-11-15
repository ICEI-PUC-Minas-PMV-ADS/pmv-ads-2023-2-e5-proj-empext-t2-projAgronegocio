const negociacaoController = require('./negociacaoController');
const negociacaoModel = require('../models/negociacaoModel');

jest.mock('../models/negociacaoModel');

describe('negociacaoController', () => {
  it('getAll deve retornar uma lista de negociações', async () => {
    const negociacoes = [{ id: 1, descricao: 'Negociação 1' }, { id: 2, descricao: 'Negociação 2' }];
    negociacaoModel.getAll.mockResolvedValue(negociacoes);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await negociacaoController.getAll(req, res);

    expect(negociacaoModel.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(negociacoes);
  });

  it('getNegociacaoRecente deve retornar uma lista de negociações recentes', async () => {
    const negociacoesRecentes = [{ id: 3, descricao: 'Negociação 3' }, { id: 4, descricao: 'Negociação 4' }];
    negociacaoModel.getNegociacaoRecente.mockResolvedValue(negociacoesRecentes);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await negociacaoController.getNegociacaoRecente(req, res);

    expect(negociacaoModel.getNegociacaoRecente).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(negociacoesRecentes);
  });

  it('getById deve retornar uma única negociação com base no ID', async () => {
    const id = 1;
    const negociacao = { id: 1, descricao: 'Negociação 1' };
    negociacaoModel.getById.mockResolvedValue(negociacao);

    const req = { params: { id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await negociacaoController.getById(req, res);

    expect(negociacaoModel.getById).toHaveBeenCalledWith(id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(negociacao);
  });

  it('createNegociacao deve criar uma nova negociação', async () => {
    const novaNegociacao = { descricao: 'Nova Negociação' };
    const negociacaoCriada = { id: 5, descricao: 'Nova Negociação' };
    negociacaoModel.createNegociacao.mockResolvedValue(negociacaoCriada);

    const req = { body: novaNegociacao };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await negociacaoController.createNegociacao(req, res);

    expect(negociacaoModel.createNegociacao).toHaveBeenCalledWith(novaNegociacao);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(negociacaoCriada);
  });

  it('deleteNegociacao deve excluir uma negociação com base no ID', async () => {
    const id = 1;

    const req = { params: { id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await negociacaoController.deleteNegociacao(req, res);

    expect(negociacaoModel.deleteNegociacao).toHaveBeenCalledWith(id);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith();
  });

  it('updateNegociacao deve atualizar uma negociação com base no ID', async () => {
    const id = 1;
    const negociacaoAtualizada = { descricao: 'Negociação Atualizada' };

    const req = { params: { id }, body: negociacaoAtualizada };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await negociacaoController.updateNegociacao(req, res);

    expect(negociacaoModel.updateNegociacao).toHaveBeenCalledWith(id, negociacaoAtualizada);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith();
  });
});
