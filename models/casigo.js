//create account
//verify account
const NodeRSA = require('node-rsa');
module.exports = {
	test: function (req, res, next){
		let sig = Buffer.from(req.body.sig)
		req.app.locals.sDAG_db.collection('account').find({/*ip:req.body.ip,*/account:req.body.account}).toArray().then(response => {
			key = new NodeRSA();
			console.log(response[0].publicKey)
			key.importKey(response[0].publicKey, 'pkcs8-public');
			res.send(key.verify(req.body.text, sig))
		}).catch(error => console.error(error));
	},
	coinList: function (req, res, next){
		req.app.locals.sDAG_db.collection('coin').find({}).toArray().then(response => {
                        let re = {
				url:req.url,
				result:response,
				status:0
			}
                        re["result"].forEach(function(e){
                                if(Date.now()-e["time"]>6000){
                                	e["buy"]["status"] = false
                                	e["sell"]["status"] = false
				}
                        })
			res.status(200).json(re)
                }).catch(error => console.error(error));
	},
	coinPrice: function (req, res, next){
                res.send({})
	},
	createAccount: function (req, res, next){
                if(req.ip!="::ffff:127.0.0.1"){
                        res.send({"code":"error ip"})
                }else{
                        let key = new NodeRSA({b: 512});
                                let re = {
                                        ip:req.body.ip,
                                        account:req.body.account,
                                        privateKey:key.exportKey('pkcs8-private'),
                                        publicKey:key.exportKey('pkcs8-public')
                                }
                        req.app.locals.sDAG_db.collection('account').insert(re).then(response => {
                                res.status(200).json(re)
                        }).catch(error => console.error(error));
                }
	},
	saleResult: function(req, res, next){
		req.body.ip = req.ip
		let re = {
			url:req.url,
			result:[{body:req.body,check:true}],
			status:0
		}
		req.app.locals.sDAG_db.collection('account').find({"ip":req.ip}).toArray().then(response => {
			//if(response[0]!=undefined){
                        	//key = new NodeRSA();
                        	//key.importKey(response[0].publicKey, 'pkcs8-public');
                        	//if(key.verify(req.body.time, sig)==true){
					//if(price>){
				let swaping = 0.01;
				if(req.body.side=="buy"){
					swaping = 1-(swaping)
				}else{swaping = 1+(swaping)}
				req.app.locals.sDAG_db.collection('coin').find({"coin":req.body.coin}).toArray().then(response => {
					if((req.body.side=="buy"&&req.body.price>=response[0][req.body.side]["twd"]*swaping)||req.body.side=="sell"&&req.body.price<=response[0][req.body.side]["twd"]*swaping){
                                                req.app.locals.sDAG_db.collection('list').insert(req.body).then(response => {
                                                        //res.status(200).json(re)
							res.send({url:req.url, result:true, status:0})
                                                }).catch(error => console.error(error));
					//}else if(req.body.side=="sell"&&req.body.price<response[0][req.body.side]["twd"]*swaping){
					}else{
						res.send({url:req.url, result:false, status:0, error:"dynamic price"})
					}
				}).catch(error => console.error(error));
			//}else{res.send({"code":"error ip"})}
		});
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
