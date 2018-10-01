'use strict';

const factory = require('../services/facadeFactory')

module.exports = [
    {
        method: 'GET',
        path: '/tests/{id}',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                let id = request.params.id

                let response = await factory[blockchain].getTest(token, id);

                let model = {
                    userInfo
                }

                if (response.data) { // && response.data.authorizations) {
                    console.log(response);
                    model.questionary = response.data;
                    model.questionaryString = JSON.stringify(response.data)
                    console.log("MODELO: ", model);
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                return h.view('showTest', model)
            }
        }
    },
    {
        method: 'POST',
        path: '/tests/{id}',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                let answers = [];
                for (var key in request.payload) {
                    answers.push(request.payload[key]);
                }

                let questionary = answers.shift();

                // console.log(questionary)
                // console.log(answers)

                let response = await factory[blockchain].verifyTest(token, questionary, JSON.stringify(answers), userInfo.username)

                let model = {
                    userInfo
                }

                if (response.data) {
                    model.testStored = "The test has been correctly stored"
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                return h.view('showTestResult', model)
            }
        }
    },
    {
        method: 'GET',
        path: '/tests/{id}/results',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                let id = request.params.id

                let response = await factory[blockchain].getTestResult(token, id, userInfo.username);

                let model = {
                    userInfo
                }

                if (response.data) { // && response.data.authorizations) {
                    console.log(response);
                    model.result = response.data
                    console.log("MODELO: ", model);
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                return h.view('showTestResult', model)
            }
        }
    },
    {
        method: 'GET',
        path: '/tests',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                let response = await factory[blockchain].getAllTests(token, userInfo.username);

                let model = {
                    userInfo
                }

                if (response.data) { // && response.data.authorizations) {
                    console.log(response);
                    model.tests = response.data
                    console.log("MODELO: ", model);
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                return h.view('testsResults', model)
            }
        }
    },
    {
        method: 'POST',
        path: '/tests/{id}/resultDetails',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
        //         // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                let id = request.params.id
                
                let response = await factory[blockchain].getResultDetails(token, id, userInfo.username);

                let model = {
                    userInfo
                }

                if (response.data) { // && response.data.authorizations) {
                    model.testResults = {
                        id: response.data.id,
                        score: response.data.score,
                        passed: response.data.passed
                    }
                }

        //         if (request.query.pre) {
        //             model.successMsg = 'Completed Successfully'
        //         }

                return h.view('testsResults', model)
            }
        }
    },
    {
        method: 'GET',
        path: '/tests/{id}/answerDetails',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                let id = request.params.id

                let response = await factory[blockchain].getAnswerDetails(token, id, userInfo.username);

                let model = {
                    userInfo
                }

                if (response.data) { // && response.data.authorizations) {
                    console.log(response);
                    model.answersDetails= response.data
                    console.log("MODELO: ", model);
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                return h.view('testsResults', model)
            }
        }
    }
]
