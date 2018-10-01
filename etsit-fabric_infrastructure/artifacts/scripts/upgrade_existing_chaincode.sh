#!/bin/bash

echo
echo " ____    _____      _      ____    _____ "
echo "/ ___|  |_   _|    / \    |  _ \  |_   _|"
echo "\___ \    | |     / _ \   | |_) |   | |  "
echo " ___) |   | |    / ___ \  |  _ <    | |  "
echo "|____/    |_|   /_/   \_\ |_| \_\   |_|  "
echo
echo "Build your first network (BYFN) end-to-end test"
echo
CHANNEL_NAME="$1"
CHAINCODE_NAME="$2"
CHAINCODE_VERSION="$3"
DESIRED_PEERS="$4"
PEER_WHO_UPGRADE="$5"
DESIRED_POLICY="$6"
: ${CHANNEL_NAME:="mychannel"}
: ${TIMEOUT:="60"}
: ${DELAY:="5"}
: ${CHAINCODE_NAME:="chaincode_example02"}
: ${CHAINCODE_VERSION:="1.0"}
: ${DESIRED_PEERS:="0 1 2 3 4"}
: ${PEER_WHO_UPGRADE:="0"}
: ${DESIRED_POLICY:="OR  ('Org1MSP.member','Org2MSP.member','Org3MSP.member','Org4MSP.member','Org5MSP.member')"}
COUNTER=1
MAX_RETRY=5
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/pharmacy.com/orderers/orderer.pharmacy.com/msp/tlscacerts/tlsca.pharmacy.com-cert.pem

echo "Channel name : "$CHANNEL_NAME

# verify the result of the end-to-end test
verifyResult () {
	if [ $1 -ne 0 ] ; then
		echo "!!!!!!!!!!!!!!! "$2" !!!!!!!!!!!!!!!!"
    echo "========= ERROR !!! FAILED to execute End-2-End Scenario ==========="
		echo
   		exit 1
	fi
}

setGlobals () {

	if [ $1 -eq 0 ] ; then
		CORE_PEER_LOCALMSPID="Org1MSP"
		CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/arm.pharmacy.com/peers/peer0.arm.pharmacy.com/tls/ca.crt
		CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/arm.pharmacy.com/users/Admin@arm.pharmacy.com/msp
                CORE_PEER_ADDRESS=peer0.arm.pharmacy.com:7051
	elif [ $1 -eq 1 ]; then
                CORE_PEER_LOCALMSPID="Org2MSP"
                CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/lab1.pharmacy.com/peers/peer0.lab1.pharmacy.com/tls/ca.crt
                CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/lab1.pharmacy.com/users/Admin@lab1.pharmacy.com/msp
                CORE_PEER_ADDRESS=peer0.lab1.pharmacy.com:7051
	elif [ $1 -eq 2 ]; then
                CORE_PEER_LOCALMSPID="Org3MSP"
                CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/lab2.pharmacy.com/peers/peer0.lab2.pharmacy.com/tls/ca.crt
                CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/lab2.pharmacy.com/users/Admin@lab2.pharmacy.com/msp
                CORE_PEER_ADDRESS=peer0.lab2.pharmacy.com:7051
        elif [ $1 -eq 3 ]; then
                CORE_PEER_LOCALMSPID="Org4MSP"
                CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/arf.pharmacy.com/peers/peer0.arf.pharmacy.com/tls/ca.crt
                CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/arf.pharmacy.com/users/Admin@arf.pharmacy.com/msp
                CORE_PEER_ADDRESS=peer0.arf.pharmacy.com:7051
        elif [ $1 -eq 4 ]; then
                CORE_PEER_LOCALMSPID="Org5MSP"
                CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/phar1.pharmacy.com/peers/peer0.phar1.pharmacy.com/tls/ca.crt
                CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/phar1.pharmacy.com/users/Admin@phar1.pharmacy.com/msp
                CORE_PEER_ADDRESS=peer0.phar1.pharmacy.com:7051
	fi

	env |grep CORE
}

installChaincode () { 
	for ch in $1; do
        	# $1 - peerX.orgX , $2 - chaincode_name , $3 - chaincode_version
		PEER=$ch
		setGlobals $PEER
		peer chaincode install -n $2 -v $3 -p github.com/hyperledger/fabric/examples/chaincode/go/$2 >&log.txt
		res=$?
		cat log.txt
        	verifyResult $res "Chaincode installation on remote peer PEER$PEER has Failed"
		echo "===================== Chaincode is installed on remote peer PEER$PEER ===================== "
		echo
	done
}

upgradeChaincode () {
        # $1 - peerX.orgX , $2 - chaincode_name , $3 - chaincode_version , $4 - desired_policy
	PEER=$1
	setGlobals $PEER
	# while 'peer chaincode' command can get the orderer endpoint from the peer (if join was successful),
	# lets supply it directly as we know it using the "-o" option
	if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
		peer chaincode upgrade -o orderer.pharmacy.com:7050 -C $CHANNEL_NAME -n $2 -v $3 -c '{"Args":[""]}' -P "$4" >&log.txt
	else
		peer chaincode upgrade -o orderer.example.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n $2 -v $3 -c '{"Args":[""]}' -P "$4" >&log.txt
	fi
	res=$?
	cat log.txt
	verifyResult $res "Chaincode upgrade on PEER$PEER on channel '$CHANNEL_NAME' failed"
	echo "===================== Chaincode Upgrade on PEER$PEER on channel '$CHANNEL_NAME' is successful ===================== "
	echo ""
}

#chaincodeQuery () {
#  PEER=$1
#  echo "===================== Querying on PEER$PEER on channel '$CHANNEL_NAME'... ===================== "
#  setGlobals $PEER
#  local rc=1
#  local starttime=$(date +%s)
#
#  # continue to poll
#  # we either get a successful response, or reach TIMEOUT
#  while test "$(($(date +%s)-starttime))" -lt "$TIMEOUT" -a $rc -ne 0
#  do
#     sleep $DELAY
#     echo "Attempting to Query PEER$PEER ...$(($(date +%s)-starttime)) secs"
#     peer chaincode query -C $CHANNEL_NAME -n mycc -c '{"Args":["query","a"]}' >&log.txt
#     test $? -eq 0 && VALUE=$(cat log.txt | awk '/Query Result/ {print $NF}')
#     test "$VALUE" = "$2" && let rc=0
#  done
#  echo
#  cat log.txt
#  if test $rc -eq 0 ; then
#	echo "===================== Query on PEER$PEER on channel '$CHANNEL_NAME' is successful ===================== "
#  else
#	echo "!!!!!!!!!!!!!!! Query result on PEER$PEER is INVALID !!!!!!!!!!!!!!!!"
#        echo "================== ERROR !!! FAILED to execute End-2-End Scenario =================="
#	echo
#	exit 1
#  fi
#}
#
#chaincodeInvoke () {
#	PEER=$1
#	setGlobals $PEER
#	# while 'peer chaincode' command can get the orderer endpoint from the peer (if join was successful),
#	# lets supply it directly as we know it using the "-o" option
#	if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
#		peer chaincode invoke -o orderer.example.com:7050 -C $CHANNEL_NAME -n mycc -c '{"Args":["invoke","a","b","10"]}' >&log.txt
#	else
#		peer chaincode invoke -o orderer.example.com:7050  --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n mycc -c '{"Args":["invoke","a","b","10"]}' >&log.txt
#	fi
#	res=$?
#	cat log.txt
#	verifyResult $res "Invoke execution on PEER$PEER failed "
#	echo "===================== Invoke transaction on PEER$PEER on channel '$CHANNEL_NAME' is successful ===================== "
#	echo
#}

if [ $# -ne 6 ]
then
   echo "  Invalid parameters: Usage: $0 CHANNEL_NAME CHAINCODE_NAME CHAINCODE_NEW_VERSION DESIRED_PEERS PEER_WHO_UPGRADE DESIRED_POLICY"
   echo ""
   echo "     Example: $0 channel1 chaincode_example02 2.0 \"0 1 2 3 4\" \"0\" \"OR  ('Org1MSP.member','Org2MSP.member')\""
else
   echo "Installing chaincode on DESIRED_PEERS..."
   installChaincode "$DESIRED_PEERS" "$CHAINCODE_NAME" "$CHAINCODE_VERSION"

   echo ""
   echo "Upgrading chaincode on PEER$PEER_WHO_UPGRADE, with policy: $DESIRED_POLICY"
   upgradeChaincode "$PEER_WHO_UPGRADE" "$CHAINCODE_NAME" "$CHAINCODE_VERSION" "$DESIRED_POLICY"

   echo
   echo "========= All GOOD, Completed!! =========== "
fi

exit 0
