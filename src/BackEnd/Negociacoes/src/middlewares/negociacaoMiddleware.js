const validateBody = (req, res, next) => {
    const { body } = req;

    if (body.cliente_produtor === undefined || body.cliente_produtor === '') {
        res.status(400).json({ message: 'Campo "cliente_produtor" é obrigatório' });
        return;
    }
    if (body.tipo_operacao === undefined || body.tipo_operacao === '') {
        res.status(400).json({ message: 'Campo "tipo_operacao" é obrigatório' });
        return;
    }
    if (body.valor_por_saca === undefined || body.valor_por_saca === '') {
        res.status(400).json({ message: 'Campo "valor_por_saca" é obrigatório' });
        return;
    }
    if (body.quantidade_saca === undefined || body.quantidade_saca === '') {
        res.status(400).json({ message: 'Campo "quantidade_saca" é obrigatório' });
        return;
    }
    if (body.data_vencimento === undefined || body.data_vencimento === '') {
        res.status(400).json({ message: 'Campo "data_vencimento" é obrigatório' });
        return;
    }
    if (body.valor_total === undefined || body.valor_total === '') {
        res.status(400).json({ message: 'Campo "valor_total" é obrigatório' });
        return;
    }
    if (body.unidade === undefined || body.unidade === '') {
        res.status(400).json({ message: 'Campo "unidade" é obrigatório' });
        return;
    }

    next();
};

module.exports = {
    validateBody,
}