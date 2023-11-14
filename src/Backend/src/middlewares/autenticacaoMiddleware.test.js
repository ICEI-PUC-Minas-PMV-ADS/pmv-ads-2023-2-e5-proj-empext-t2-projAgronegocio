const autenticacaoMiddleware = require('./autenticacaoMiddleware');

describe('autenticacaoMiddleware', () => {
  describe('validateRegister', () => {
    it('deve passar para o próximo middleware se os campos obrigatórios estiverem preenchidos', () => {
      const req = {
        body: {
          name: 'John',
          email: 'john@example.com',
          password: 'password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      autenticacaoMiddleware.validateRegister(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "name" estiver ausente', () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      autenticacaoMiddleware.validateRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "name" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "email" estiver ausente ou em formato inválido', () => {
      const req = {
        body: {
          name: 'John',
          password: 'password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      autenticacaoMiddleware.validateRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "email" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "password" estiver ausente', () => {
      const req = {
        body: {
          name: 'John',
          email: 'john@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      autenticacaoMiddleware.validateRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "password" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateLogin', () => {
    it('deve passar para o próximo middleware se os campos obrigatórios estiverem preenchidos', () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      autenticacaoMiddleware.validateLogin(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "email" estiver ausente ou em formato inválido', () => {
      const req = {
        body: {
          password: 'password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      autenticacaoMiddleware.validateLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "email" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar status 400 e uma mensagem de erro se o campo "password" estiver ausente', () => {
      const req = {
        body: {
          email: 'john@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      autenticacaoMiddleware.validateLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campo "password" é obrigatório' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
