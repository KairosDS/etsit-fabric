'use strict';

const factory = require('../services/facadeFactory')

module.exports = [
    {
        method: 'GET',
        path: '/upload',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials

                let model = {
                    userInfo
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                // if (_.includes(userInfo.roles, 'LAB')) {

                return h.view('upload', model)
            }
        }
    },

    {
        method: 'POST',
        path: '/upload',
        // config: {
        //     payload: {
        //         maxBytes: 104857600
        //     },
        // },
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
                let fichero = request.payload.fichero
                let startDate = request.payload.startDate
                let endDate = request.payload.endDate
                let counterPartyA = request.payload.counterPartyA
                let counterPartyB = request.payload.counterPartyB
                let namePartyA = request.payload.namePartyA
                let namePartyB = request.payload.namePartyB
                let signatureDateA = request.payload.signatureDateA
                let signatureDateB = request.payload.signatureDateB
                let counterpartyUser = request.payload.counterpartyUser
                console.log("UPLOADED DATA", key, startDate, endDate, counterPartyA, counterPartyB, namePartyA, namePartyB, signatureDateA, signatureDateB, counterpartyUser);


                let pre = ''

                request.server.log('info', 'Uploading file')

                // obtain DATE dinamically

                await factory[blockchain].storeBigFile(key, fichero, startDate, endDate, token)

                pre = 'update'
                return h.redirect('/upload?pre=' + pre)
            }
        }
    }
]
