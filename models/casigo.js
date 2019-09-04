module.exports = {
	coinList: function (req, res, next){
		res.send({
				url:req.url,
				result:[{coin:"btc",status:true,buy:"10000",sell:"20000"}],
				status:0
			})
	},
	coinPrice: function (req, res, next){
                res.send({})
	},
	saleResult: function(req, res, next){
		console.log(req.body.sign)
		console.log(req.body.id)
		console.log(req.body.balance)
		console.log(req.body.time)
		console.log(req.body.price)
		console.log(req.body.side)
		res.send({
                                url:req.url,
                                result:[{body:req.body,check:true}],
                                status:0
		})
	},
	redeemResult: function(req, res, next){
		res.send({})
	},
	casigo: function (req, res, next){
		res.send(Math.round(Math.random()*37).toString())
	},
	
	casigoErr: function (req, res, next){
		"123".string()
		res.send("casigo!")
	}
}
