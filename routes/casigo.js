var express = require('express');
var casigo = require('../models/casigo');
var router = express.Router();

router.post('/test', casigo.test);

router.post('/createAccount', casigo.createAccount)

router.get('/', casigo.casigo);

router.get('/err', casigo.casigoErr);

router.get('/coinList', casigo.coinList);

router.get('/coinPrice', casigo.coinPrice);

router.post('/saleResult', casigo.saleResult);

router.get('/redeemResult', casigo.redeemResult);

module.exports = router;
