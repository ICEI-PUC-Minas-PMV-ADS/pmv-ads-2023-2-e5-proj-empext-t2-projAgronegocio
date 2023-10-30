const dbConnection = require('./dbConnection');

describe('Testes para a conexão com o banco de dados', () => {
  it('Deve conectar ao banco de dados com sucesso', async () => {
    try {
      await new Promise((resolve, reject) => {
        dbConnection.connect((err) => {
          if (err) {
            reject('Erro ao conectar ao banco de dados: ' + err);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  it('Deve encerrar a conexão com o banco de dados com sucesso', async () => {
    try {
      await new Promise((resolve, reject) => {
        dbConnection.end((err) => {
          if (err) {
            reject('Erro ao encerrar a conexão com o banco de dados: ' + err);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  });
});

// Encerrar a conexão com o banco de dados depois de todos os testes
afterAll(() => {
  dbConnection.end();
});
