const express = require('express');
const repository = require('../repositories/usuario-repository.js');

const router = express.Router();

router.get('/', async function (req, res) {
    const response = await repository.get();
    console.log('response:', response)
    return res.send(response)
});


router.post('/registrar', async function (req, res) {
    const response = await repository.registrar(req.body);
    console.log('response:', response)
    return res.send(response)
});


router.post('/login', async function (req, res) {
    const response = await repository.login(req.body);
    console.log('response:', response)
    return res.send(response)
});

router.get('/obter-registros', async function (req, res) {
    const id = req.query.id;
    const response = await repository.obterRegistros(id);
    console.log('response:', response)
    return res.send(response)
});

router.get('/obter-pagamento', async function (req, res) {
    const { id, mes, ano } = req.query;
    const response = await repository.obterPagamento(id, mes, ano);
    console.log('response:', response)
    return res.send(response)
});

router.post('/registrar-ponto', async function (req, res) {
    const response = await repository.registrarPonto(req.body);
    return res.send(response)
})

module.exports = router;