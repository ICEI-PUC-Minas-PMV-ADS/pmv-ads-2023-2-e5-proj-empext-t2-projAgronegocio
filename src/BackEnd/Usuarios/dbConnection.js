// //conexão com o banco de dados
var mysql = require('mysql');


require('dotenv').config();

const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DB = process.env.MYSQL_DB;


var conectarBD = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB,
});

conectarBD.connect(function(err){
     if (err) throw err;
     console.log(('Banco de dados conectado com sucesso!'));
});

module.exports = conectarBD;


