const { check } = require('express-validator');

exports.signupValidation = [
    check('nome', 'O nome é obrigatório.').not().isEmpty(),
    check('email', 'Favor incluir um email válido.').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('senha', 'A senha deve ter 5 ou mais caracteres e não pode estar vazia.').isLength({min: 5}).notEmpty(),
    //check('cpfCnpj', 'O campo deve ter 11 ou mais caracteres.').isLength({min: 11})
]

exports.loginValidation = [
    check('email', 'Favor incluir um email válido.').isEmail().normalizeEmail({gmail_remove_dots: true}),
    check('senha', 'A senha deve ter 5 ou mais caracteres e não pode estar vazia.').isLength({min: 5}).notEmpty(),
]