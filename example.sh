#create account
curl -X POST http://127.0.0.1:2222/casigo/createAccount -H "Content-type: application/json" -d '{"ip":"12","account":"123"}'
#test
curl -X POST http://127.0.0.1:2222/casigo/test -H "Content-type: application/json" -d '{"ip":"12","account":"123", "sig":"123","text":"123"}'
#sale result
curl -X POST http://127.0.0.1:2222/casigo/saleResult -H "Content-type: application/json" -d '{"coin":"usdt", "side":"buy", "price": 1000, "address":"0x123"}'
