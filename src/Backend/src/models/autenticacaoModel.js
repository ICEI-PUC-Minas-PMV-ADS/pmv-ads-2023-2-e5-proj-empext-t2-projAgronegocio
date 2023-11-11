const connection = require('./connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEGREDO_TOKEN = process.env.SEGREDO_TOKEN;

const register = async (dados) => {
    const { name, email, password } = dados;
    let cadastro = [];
    const queryVerificacao = 'SELECT * FROM usuarios WHERE email = LOWER(?)';
    const paramsVerificacao = [email];
    const queryCadastro = 'INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)';
    const [verificaSeExiste] = await connection.query(queryVerificacao, paramsVerificacao);
    if (verificaSeExiste.length) {
        return { usuarioJaCadastrado: "Usuário já cadastrado" };
    } else {
        const hashPassword = bcrypt.hashSync(password, 10);
        console.log(hashPassword);
        [cadastro] = await connection.query(queryCadastro, [name, email, hashPassword]);
    }
    return { insertId: cadastro.insertId };
};

const login = async (dados) => {
    const { email, password } = dados;
    const queryVerificacao = 'SELECT * FROM usuarios WHERE email = LOWER(?)';
    const paramsVerificacao = [email];
    const [verificaSeExiste] = await connection.query(queryVerificacao, paramsVerificacao);
    if (verificaSeExiste.length) {
        const validarPassword = await bcrypt.compare(password, verificaSeExiste[0].senha);
        if (validarPassword) {
            const token = jwt.sign({ id: verificaSeExiste[0].id }, SEGREDO_TOKEN, { expiresIn: '1h' });
            return {
                msg: 'Usuário logado!',
                token: token,
                user: verificaSeExiste[0]
            }
        } else {
            console.log('senha incorreta');
            return null;
        }
    } else {
        console.log('usuario não existe');
        return { usuarioNaoExiste: "Usuário não existe" };
    }
};

module.exports = {
    register,
    login,
};