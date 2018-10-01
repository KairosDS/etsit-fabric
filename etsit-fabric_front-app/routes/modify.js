'use strict';

const factory = require('../services/facadeFactory')

module.exports = [
    {
        method: 'GET',
        path: '/modify',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials;
                let blockchain = userInfo.blockchain;
                let token = userInfo.token;

                let model = {
                    userInfo
                }

                let key = userInfo.username

                let response = await factory[blockchain].getAllIsdaOwner(token, key);
                    console.log("(getAllIsdaOwner) MODELO TODOLIST: 1 " + key + " ya");

                if (!response.data.includes('Error: 2')) { // && response.data.authorizations) {
                    console.log(response);
                    model.docs = response.data;
                    console.log("MODELO MODIFY: ", model);
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                // if (_.includes(userInfo.roles, 'LAB')) {

                return h.view('modify', model)
            }
        }
    },

    {
        method: 'GET',
        path: '/modify/{key}',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                // Request payload
                let key = request.params.key

                let model = {
                    userInfo
                }

                let response = await factory[blockchain].getBigFile(key, token);
                let responsePDF = await factory[blockchain].getBigFile(`${key}-`, token);
                console.log("(getBigFile) MODELO VIEW modify key: ", key);

                if (response.data) { // && response.data.authorizations) {
                    let auth = response.data.authorizations
                    model.data = response.data;
                    model.pdf = responsePDF.data;
                    console.log("MODELO VIEW MODIFY: ", model);
                }

                return h.view('modifyView', model)
            }
        }
    },

    {
        method: 'POST',
        path: '/modify',

        options: {
            auth: {
                strategy: 'session'
            },
            payload: {
                maxBytes: 104857600
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                // Request payload
                let key = request.payload.key
                let startDate = request.payload.startDate
                let endDate = request.payload.endDate
                let counterPartyA = request.payload.counterPartyA
                let counterPartyB = request.payload.counterPartyB
                let namePartyA = request.payload.namePartyA
                let namePartyB = request.payload.namePartyB
                let signatureDateA = request.payload.signatureDateA
                let signatureDateB = request.payload.signatureDateB

                console.log("MODIFIED DATA", key, startDate, endDate, counterPartyA, counterPartyB, namePartyA, namePartyB, signatureDateA, signatureDateB);


                let pre = ''

                request.server.log('info', 'modifiying file')

                // obtain DATE dinamically

                await factory[blockchain].updateBigFile(key, startDate, endDate, counterPartyA, counterPartyB, namePartyA, namePartyB, signatureDateA, signatureDateB, token)

                pre = 'update'
                return h.redirect('/modify?pre=' + pre)
            }
        }
    }

]