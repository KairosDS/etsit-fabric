package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

type SmartContract struct {
}

type Item struct {
	Type        string `json:"type"`
	Description string `json:"description"`
}

var logger = *shim.NewLogger("etsitLogger")

func (s *SmartContract) Init(APIStub shim.ChaincodeStubInterface) sc.Response {
	fmt.Println("SmartContract has been instantiated")
	return shim.Success(nil)
}

func (s *SmartContract) Invoke(APIStub shim.ChaincodeStubInterface) sc.Response {
	function, args := APIStub.GetFunctionAndParameters()

	switch function {
	case "addItem":
		return s.addItem(APIStub, args)
	case "queryItem":
		return s.queryItem(APIStub, args)
	default:
		return shim.Error("No function specified")
	}
}

func (s *SmartContract) addItem(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3: {key, itemType, itemDesc}")
	}

	var item = Item{
		Type:        args[1],
		Description: args[2],
	}

	itemAsBytes, _ := json.Marshal(item)
	APIstub.PutState(args[0], itemAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) queryItem(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	if len(args[0]) == 0 {
		return shim.Error("Empty key. Expecting a valid key")
	}

	itemAsBytes, _ := APIstub.GetState(args[0])

	if len(itemAsBytes) == 0 {
		return shim.Error("Invalid key. It is empty")
	}

	return shim.Success(itemAsBytes)
}

func main() {
	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
