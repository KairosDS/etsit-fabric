'use strict';

const factory = require('../services/facadeFactory')

module.exports = [
    {
        method: 'GET',
        path: '/irs',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                let model = {
                    userInfo
                }

                let key = userInfo.username

                let response = await factory[blockchain].getAllIsdaIRS(token, key);
                    console.log("(getAllIsdaIRS) MODELO TODOLIST: 1 " + key + " ya");

                if (!response.data.includes('Error: 2')) { // && response.data.authorizations) {
                    console.log(response);
                    model.docs = response.data;
                    console.log("MODELO IRS: ", model);
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully';
                }

                // if (_.includes(userInfo.roles, 'LAB')) {

                return h.view('irs', model)
            }
        }
    },

    {
        method: 'GET',
        path: '/irs/{key}',
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
                console.log("(getBigFile) MODELO VIEW irs key: ", key);

                if (response.data) { // && response.data.authorizations) {
                    let auth = response.data.authorizations
                    model.data = response.data;
                    model.pdf = responsePDF.data;
                    console.log("MODELO VIEW irs: ", model);
                }

                return h.view('irsView', model)
            }
        }
    },

    {
        method: 'POST',
        path: '/irs',

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
                let key = request.payload.key // ISDA
                let irs = request.payload.irs

                let operationDate = request.payload.operationDate
                let nominal = request.payload.nominal
                let finalDate = request.payload.finalDate
                let startDate = request.payload.startDate
                let endDate = request.payload.endDate

                let counterpartya = request.payload.counterpartya
                let counterpartyb = request.payload.counterpartyb

                let qtyfixed = request.payload.qtyfixed
                let qtyvariable = request.payload.qtyvariable

                let years = request.payload.years
                let paymentype = request.payload.paymentype

                let fixedpayment = request.payload.fixedpayment
                let variablepayment = request.payload.variablepayment

                let owner = userInfo.username
                let counterpartyUser = request.payload.counterpartyUser

                console.log("IRS DATA", key, irs, operationDate, finalDate, startDate, endDate, counterpartya, counterpartyb, qtyfixed, qtyvariable, years, paymentype, fixedpayment, variablepayment, owner, counterpartyUser, nominal);


                let pre = ''

                request.server.log('info', 'modifiying file')

                // obtain DATE dinamically

                await factory[blockchain].storeIRS(key, irs, operationDate, finalDate, startDate, endDate, counterpartya, counterpartyb, qtyfixed, qtyvariable, years, paymentype, fixedpayment, variablepayment, owner, counterpartyUser, nominal, token)

                pre = 'irs'
                return h.redirect('/irs?pre=' + pre)
            }
        }
    }

]
