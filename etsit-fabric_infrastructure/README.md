## Instructions to execute this example

In order to execute this example you must execute some instructions because we have changed the way we launch the system.
Now, the API and the Blockchain infra are isolated, so:
1. You have to execute ```./runApp.sh``` to raise the infra.
2. And exuecute ```npm install``` and ```npm start``` to set up the API.

> NOTE: The front App is located on https://github.com/KairosDS/etsit-fabric/tree/master/etsit-fabric_front-app.

Now, you must configure at least one channel and set up a chaincode on the peers to interact with them. The steps that you have to execute manually are:
1. Login
2. Create a channel
3. Join a channel
4. Install a chaincode
5. Instantiate a chaincode.

### Login.

Using curl:
```
curl -s -X POST http://localhost:4000/users -H "content-type: application/x-www-form-urlencoded" -d 'username=user&orgName=Org1'
```
With postman:

 Make a POST request to http://localhost:4000/users and add the username and orgName with the x-www-form-urlencoded selected.

 In both cases the response will contain a token to add in the next requests.

### Create a channel.

Using curl

```
curl -s -X POST \
  http://localhost:4000/channels \
  -H "authorization: Bearer <put the previous Token here>" \
  -H "content-type: application/json" \
  -d '{
	"channelName":"mychannel",
	"channelConfigPath":"../artifacts/channel/mychannel.tx"
}'
```

With Postman:

Make a POST request to http://localhost:4000/channels adding this JSON in raw

```
{
	"channelName":"mychannel",
	"channelConfigPath":"../artifacts/channel/mychannel.tx"
}
```
Don't forget add the header authorization : Bearer + <and here the token>

### Join a channel

Using curl:

```
curl -s -X POST \
  http://localhost:4000/channels/<channel name>/peers \
  -H "authorization: Bearer <put the Token here>" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer0.org1.etsit.com"]
}'
```

With Postmanm:

As usual make a POST request to http://localhost:4000/channels/<channel name>/peers adding this raw  this time:
```
{
	"peers": ["peer0.org1.etsit.com"]
}
```
In both cases peers will contain an array with the list of peers that you are joining to the channel .

The token is mandatory in all requests so don't forget on this.

### Install a chaincode

Using curl:

```
curl -s -X POST \
  http://localhost:4000/chaincodes \
  -H "authorization: Bearer <put the Token here>" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer0.org1.etsit.com"],
	"chaincodeName":"etsit",
	"chaincodePath":"github.com/etsit/go",
	"chaincodeType": "golang",
	"chaincodeVersion":"v0"
}'
```

With Postman:

A POST request to http://localhost:4000/chaincodes with this raw instead.

```
{
	"peers": ["peer0.org1.etsit.com"],
	"chaincodeName":"etsit",
	"chaincodePath":"github.com/etsit/go",
	"chaincodeType": "golang",
	"chaincodeVersion":"v0"
}
```

In both cases watch out to install the chaincodes in the same peers list that when you create the channel.

### Instantiate chaincode

Using curl:

```
curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes \
  -H "authorization: Bearer <put the Token here>" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer0.org1.etsit.com"],
	"chaincodeName":"etsit",
	"chaincodeVersion":"v0",
	"chaincodeType": "golang",
	"args":[]
}'
```

With Postman:

Make a POST request to http://localhost:4000/channels/mychannel/chaincodes and in the raw put this JSON.

```
{
	"peers": ["peer0.org1.etsit.com"],
	"chaincodeName":"etsit",
	"chaincodeVersion":"v1",
	"chaincodeType": "golang",
	"args":[""]
}
```


In both cases watch out to instantiate the chaincodes in the same peers list that when you create the channel and install the chaincode.

There is a collection in Postman with all the requests with the params etc, this collection will save you a lot of typping.


After this requests, you could start the [front](https://github.com/KairosDS/etsit-fabric/tree/master/etsit-fabric_front-app) and have fun with Hyperledger.

