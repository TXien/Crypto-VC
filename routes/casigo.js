var express = require('express');
var casigo = require('../models/casigo');
var router = express.Router();


router.get('/', casigo.casigo);

router.get('/err', casigo.casigoErr);

router.get('/coinList', casigo.coinList);

router.get('/coinPrice', casigo.coinPrice);

router.get('/saleResult', casigo.saleResult);

router.get('/redeemResult', casigo.redeemResult);

module.exports = router;
