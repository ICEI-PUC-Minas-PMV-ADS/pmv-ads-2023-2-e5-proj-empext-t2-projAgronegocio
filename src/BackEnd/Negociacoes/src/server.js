const swaggerUiExpress = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

const app = require('./app');

require('dotenv').config();

app.use('/api-docs-negociacoes', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));