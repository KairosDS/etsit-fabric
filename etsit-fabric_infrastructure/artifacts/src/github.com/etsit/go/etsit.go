package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

type SmartContract struct {
}

type Users struct {
	Name string `json:"name"`
	Age  string `json:"age"`
}

var logger = *shim.NewLogger("etsitLogger")

func (s *SmartContract) Init(APIStub shim.ChaincodeStubInterface) sc.Response {
	fmt.Println("SmartContract has been instantiated")
	return shim.Success(nil)
}

func (s *SmartContract) Invoke(APIStub shim.ChaincodeStubInterface) sc.Response {
	function, args := APIStub.GetFunctionAndParameters()

	switch function {
	case "addUser":
		return s.addUser(APIStub, args)
	default:
		return shim.Error("No function specified")
	}
	return shim.Success(nil)
}

func (s *SmartContract) addUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3")
	}

	var user = Users{
		Name: args[1],
		Age:  args[2],
	}

	userAsBytes, _ := json.Marshal(user)
	APIstub.PutState(args[0], userAsBytes)

	return shim.Success(nil)
}

func main() {
	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
