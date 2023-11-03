const express = require('express');

const router = express.Router();

const negociacaoController = require('./controllers/negociacaoController');
const negociacaoMiddleware = require('./middlewares/negociacaoMiddleware');
const pessoasController = require('./controllers/pessoasController');
const unidadesController = require('./controllers/unidadesController');

router.get('/negociacao', negociacaoController.getAll);
router.get('/negociacao/:id', negociacaoController.getById);
router.post('/negociacao', negociacaoMiddleware.validateBody, negociacaoController.createNegociacao);
router.delete('/negociacao/:id', negociacaoController.deleteNegociacao);
router.put('/negociacao/:id', negociacaoMiddleware.validateBody, negociacaoController.updateNegociacao);

router.get('/pessoas', pessoasController.getAll);
router.get('/pessoas/:id', pessoasController.getById);

router.get('/unidades', unidadesController.getAll);
router.get('/unidades/:id', unidadesController.getById);

module.exports = router;
