const swaggerUiExpress = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

const express = require ('express');
const porta = process.env.PORT || 5000;
const bodyParser = require ('body-parser');
const cors = require('cors');
const indexRouter = require('./router');

require('dotenv').config();


const app = express();

app.use(express.json());

app.use("/api-docs-users", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', indexRouter);

// tratamento de erros: aqui é onde captura e processa erros que ocorrem 
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


// aceita três argumentos: port, host e uma função de retorno de chamada que é acionada quando o servidor começa a escutar.
app.listen(porta,() => console.log(`Servidor está rodando na porta ${porta}`));