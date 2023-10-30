const express = require('express');
const request = require('supertest');
const app = require('./route'); // Importe a aplicação Express
const dbConnection = require('./dbConnection');

beforeAll(() => {
  // Configurar a conexão com o banco de dados de teste
  const { MYSQL_TEST_HOST, MYSQL_TEST_USER, MYSQL_TEST_PASSWORD, MYSQL_TEST_DB } = process.env;

  dbConnection.connect();
});

// Após a execução dos testes, fechar a conexão com o banco de dados
afterAll(() => {
  dbConnection.end();
});

describe('Testes para as rotas do router', () => {
  it('Deve cadastrar um usuário com sucesso', async () => {
    // Realizar uma chamada a rota de cadastro de usuário
    const response = await request(app)
      .post('/api/usuarios/register') 
      .send({
        name: 'Nome do Usuário',
        email: 'novousuario@example.com',
        password: 'senha123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.msg).toBe('Usuário registrado com sucesso!');
  });

  it('Deve retornar erro ao tentar cadastrar um usuário com email já em uso', async () => {
    // Realizar uma chamada a rota de cadastro de usuário com um email que já está em uso
    const response = await request(app)
      .post('/api/usuarios/register')
      .send({
        name: 'Nome do Usuário',
        email: 'email-em-uso@example.com',
        password: 'senha123',
      });

    expect(response.statusCode).toBe(409);
    expect(response.body.msg).toBe('Este usuário já está em uso!');
  });

  it('Deve fazer login com sucesso e retornar um token', async () => {
    // Realizar uma chamada a rota de login
    const response = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'email@example.com',
        password: 'senha123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe('Usuário logado!');
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
  });

  it('Deve retornar erro ao tentar fazer login com dados incorretos', async () => {
    // Realizar uma chamada a rota de login com dados incorretos
    const response = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'email@example.com',
        password: 'senha-incorreta',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.msg).toBe('Dados incorretos!');
  });
});
