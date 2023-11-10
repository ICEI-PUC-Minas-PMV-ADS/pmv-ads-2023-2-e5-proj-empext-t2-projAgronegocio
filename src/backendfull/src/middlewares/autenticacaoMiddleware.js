const validateRegister = (req, res, next) => {
    const { body } = req;

    if (body.name === undefined || body.name === '' || body.name === null) {
        res.status(400).json({ message: 'Campo "name" é obrigatório' });
        return;
    }
    if (body.email === undefined || body.email === '' || body.email === null && body.email.isEmail()) {
        res.status(400).json({ message: 'Campo "email" é obrigatório' });
        return;
    }
    if (body.password === undefined || body.password === '' || body.password === null) {
        res.status(400).json({ message: 'Campo "password" é obrigatório' });
        return;
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { body } = req;

    if (body.email === undefined || body.email === '' || body.email === null && body.email.isEmail()) {
        res.status(400).json({ message: 'Campo "email" é obrigatório' });
        return;
    }
    if (body.password === undefined || body.password === '' || body.password === null) {
        res.status(400).json({ message: 'Campo "password" é obrigatório' });
        return;
    }

    next();
};

module.exports = {
    validateRegister,
    validateLogin
}
