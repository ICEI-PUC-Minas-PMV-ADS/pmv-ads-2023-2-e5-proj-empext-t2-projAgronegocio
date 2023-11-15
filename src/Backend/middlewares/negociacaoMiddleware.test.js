const negociacaoMiddleware = require('./negociacaoMiddleware');

describe('negociacaoMiddleware', () => {
  describe('validateBody', () => {
    it('deve passar para o próximo middleware se todos os campos obrigatórios estiverem preenchidos', () => {
      const req = {
        body: {
          cliente_produtor: 'John Doe',
          tipo_operacao: 'Compra',
          valor_por_saca: 50.0,
          quantidade_saca: 100,
          data_vencimento: '2023-12-31',
          valor_total: 5000.0,
          unidade: 'KG',
          id_usuario: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      negociacaoMiddleware.validateBody(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "cliente_produtor" estiver ausente', () => {
      const req = {
        body: {
          tipo_operacao: 'Compra',
          valor_por_saca: 50.0,
          quantidade_saca: 100,
          data_vencimento: '2023-12-31',
          valor_total: 5000.0,
          unidade: 'KG',
          id_usuario: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      negociacaoMiddleware.validateBody(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "cliente_produtor" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "tipo_operacao" estiver ausente', () => {
      const req = {
        body: {
          cliente_produtor: 'John Doe',
          valor_por_saca: 50.0,
          quantidade_saca: 100,
          data_vencimento: '2023-12-31',
          valor_total: 5000.0,
          unidade: 'KG',
          id_usuario: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      negociacaoMiddleware.validateBody(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "tipo_operacao" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "valor_por_saca" estiver ausente', () => {
      const req = {
        body: {
          cliente_produtor: 'John Doe',
          tipo_operacao: 'Compra',
          quantidade_saca: 100,
          data_vencimento: '2023-12-31',
          valor_total: 5000.0,
          unidade: 'KG',
          id_usuario: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      negociacaoMiddleware.validateBody(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "valor_por_saca" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "quantidade_saca" estiver ausente', () => {
      const req = {
        body: {
          cliente_produtor: 'John Doe',
          tipo_operacao: 'Compra',
          valor_por_saca: 50.0,
          data_vencimento: '2023-12-31',
          valor_total: 5000.0,
          unidade: 'KG',
          id_usuario: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      negociacaoMiddleware.validateBody(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "quantidade_saca" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "data_vencimento" estiver ausente', () => {
      const req = {
        body: {
          cliente_produtor: 'John Doe',
          tipo_operacao: 'Compra',
          valor_por_saca: 50.0,
          quantidade_saca: 100,
          valor_total: 5000.0,
          unidade: 'KG',
          id_usuario: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      negociacaoMiddleware.validateBody(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "data_vencimento" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "valor_total" estiver ausente', () => {
      const req = {
        body: {
          cliente_produtor: 'John Doe',
          tipo_operacao: 'Compra',
          valor_por_saca: 50.0,
          quantidade_saca: 100,
          data_vencimento: '2023-12-31',
          unidade: 'KG',
          id_usuario: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      negociacaoMiddleware.validateBody(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "valor_total" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "unidade" estiver ausente', () => {
      const req = {
        body: {
          cliente_produtor: 'John Doe',
          tipo_operacao: 'Compra',
          valor_por_saca: 50.0,
          quantidade_saca: 100,
          data_vencimento: '2023-12-31',
          valor_total: 5000.0,
          id_usuario: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      negociacaoMiddleware.validateBody(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "unidade" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "id_usuario" estiver ausente', () => {
      const req = {
        body: {
          cliente_produtor: 'John Doe',
          tipo_operacao: 'Compra',
          valor_por_saca: 50.0,
          quantidade_saca: 100,
          data_vencimento: '2023-12-31',
          valor_total: 5000.0,
          unidade: 'KG',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      negociacaoMiddleware.validateBody(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "id_usuario" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
