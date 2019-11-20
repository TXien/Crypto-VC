var express = require('express');
var setting = require('./config/default');
var config = setting.Config();
var routes = require('./routes');
var cluster = require('cluster');
var middle_error = require('./middle/error');
var middle_normal = require('./middle/normal');
var app = express();
const MongoClient = require('mongodb').MongoClient;

console.log("node main --port 11111 --ethrpc 192.168.51.203:9999 --thread 5")
console.log("curl -X GET 'http://127.0.0.1:5314/casigo'")

middle_normal(app)
routes(app);
middle_error(app);

app.set('port', config.port);

MongoClient.connect("mongodb://192.168.51.203:27017", { useNewUrlParser: true })
	.then(client => {
		const sDAG_db = client.db('sDAG_atm');
		app.locals.block_col = sDAG_db.collection('sDAG_block');
		app.locals.transaction_col = sDAG_db.collection('sDAG_transaction');
		app.locals.sDAG_db = client.db('sDAG_atm');
		app.listen(config.port);
}).catch(error => console.error(error));
/*
var numCPUs = config.thread||2;

if (cluster.isMaster) {

	for (var i = 0; i < numCPUs; i++) {	
		cluster.fork();
	}
	
	cluster.on('listening', (worker, address) => {
		console.log(config.port,address);
	});
	
	cluster.on('exit', (worker, code, signal) => {
		console.log('worker ' + worker.process.pid + ' died');
		cluster.fork();
	});

} else {

	app.listen(app.get('port'));

}
*/

