const express = require('express');

const router = express.Router();

const autenticacaoController = require('./controllers/autenticacaoController')
const autenticacaoMiddleware = require('./middlewares/autenticacaoMiddleware')
const negociacaoController = require('./controllers/negociacaoController');
const negociacaoMiddleware = require('./middlewares/negociacaoMiddleware');
const pessoasController = require('./controllers/pessoasController');
const unidadesController = require('./controllers/unidadesController');

router.post('/usuarios/register', autenticacaoMiddleware.validateRegister, autenticacaoController.register)
router.post('/usuarios/login', autenticacaoMiddleware.validateLogin, autenticacaoController.login)

router.get('/negociacao', negociacaoController.getAll);
router.get('/negociacaorecente', negociacaoController.getNegociacaoRecente);
router.get('/negociacao/:id', negociacaoController.getById);
router.post('/negociacao', negociacaoMiddleware.validateBody, negociacaoController.createNegociacao);
router.delete('/negociacao/:id', negociacaoController.deleteNegociacao);
router.put('/negociacao/:id', negociacaoMiddleware.validateBody, negociacaoController.updateNegociacao);

router.get('/pessoas', pessoasController.getAll);
router.get('/pessoas/:id', pessoasController.getById);

router.get('/unidades', unidadesController.getAll);
router.get('/unidades/:id', unidadesController.getById);

module.exports = router;
