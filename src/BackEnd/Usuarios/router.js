const express = require('express');
const router = express.Router();
const bancoDados = require('./dbConnection');

const{ signupValidation, loginValidation } = require('./validacao');
const{validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEGREDO_TOKEN = process.env.SEGREDO_TOKEN;

// router.get('/usuarios', getAll = async () => {
//     const [usuario] = await connection.execute('SELECT * FROM Usuarios');
//     return usuario;
// });

// Rota Register irá cadastrar os dados do usuário no banco de dados.
router.post('/usuarios/register', (req, res, next) =>{
    
    //metodo escape é usado em dados fornecidos pelo usuario, isto é uma string para ser usada como um valor Sql
    bancoDados.query(`SELECT * FROM Usuarios WHERE LOWER(email) = LOWER(${bancoDados.escape(req.body.email)});`,
    (err, result) => {
        if(result.length){
            return res.status(409).send({msg: 'Este usuário já está em uso!'});
        }else{
            //nome do usuario valido
            bcrypt.hash(req.body.password,10, (err, hash) => {
                if(err){
                return res.status(500).send({msg: err});
                }else{
                    //tem hash adiciona no banco de dados
                    bancoDados.query(
                        `INSERT INTO Usuarios(nome, email, senha) VALUES ('${req.body.name}', ${bancoDados.escape(req.body.email)}, ${bancoDados.escape(hash)})`, (err,result) => {
                            if(err){
                                throw err;
                                return res.status(400).send({
                                    msg: err
                                });
                            }
                            return res.status(201).send({msg: 'Usuário registrado com sucesso!' });
                        }
                    );
                }
            });

        }
    }
    
    );
});

// Rota Login: aqui retornará o token jwt. Que é usado para chamar o método get-user.
router.post('/usuarios/login', (req, res, next)=> {
    bancoDados.query(`SELECT * FROM Usuarios WHERE email = ${bancoDados.escape(req.body.email)};`,
    (err, result) => {
        //se o usuário não existe
        if(err){
            throw err;
            return res.status(400).send({ msg: err});
        }
        if(!result.length){
            return res.status(401).send({ msg: "Dados inválidos."});
        }
        //verifica a senha
        bcrypt.compare(req.body.password,
            result[0]['senha'],(bErr, bResult) => {
                //senha incorreta
                if(bErr){
                    throw bErr;
                    return res.status(401).send({msg: 'Dados incorretos!'});
                }
                if(bResult){
                    const token = jwt.sign({id:result[0].id}, SEGREDO_TOKEN, {expiresIn: '1h'});
                    return res.status(200).send({ msg: 'Usuário logado!',
                    token,
                    user: result[0]
                });
                }
                return res.status(401).send({ msg: 'Dados inválidos!'
            });
            }
            );
        }
    )
});


//Rota get-user: receberá o token jwt e retornará os dados do usuário logado.
router.post('/get-user',signupValidation, (req, res, next) => {
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1])
    {return res.status(422).json({
        message: "Por favor forneça o token",});
    }
    const novoToken = req.headers.authorization.split('')[1];
    const converteToken = jwt.verify(novoToken, SEGREDO_TOKEN);
    bancoDados.query (`SELECT * FROM Usuarios WHERE id=?`, converteToken, function(error, results, fields){
        if(error) throw error;
        return res.send({error: false, data: results[0], message:'Usuário encontrado.'});
    });
});

module.exports = router;