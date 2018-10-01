'use strict';

const factory = require('../services/facadeFactory')

module.exports = [
    {
        method: 'GET',
        path: '/todolistRisk',
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

                let response = await factory[blockchain].getAllIRS(token, key);
                    console.log("(getAllIRS) MODELO TODOLIST: 1 " + key);

                if (!response.data.includes('Error: 2')) { // && response.data.authorizations) {
                    console.log(response);
                    model.docs = response.data;
                    console.log("MODELO TODOLISTIRS: ", model);
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                // if (_.includes(userInfo.roles, 'LAB')) {

                return h.view('todolistRisk', model)
            }
        }
    },

    {
        method: 'GET',
        path: '/todolistRisk/{key}',
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
                let user = userInfo.username

                let model = {
                    userInfo
                }

                    console.log("(getIrsFile) MODELO TODOLISTIRS: " + key + " " + user);
                let response = await factory[blockchain].getIrsFile(key, user, token);
                //let responsePDF = await factory[blockchain].getBigFile(`${key}-`, token);

                if (response.data) { // && response.data.authorizations) {
                    let auth = response.data.authorizations
                    model.data = response.data;
                    //model.pdf = responsePDF.data;
                    console.log("MODELO VIEW TODOLISTIRS: ", model);
                }

                return h.view('todolistRiskView', model)
            }
        }
    },
    {
        method: 'POST',
        path: '/todolistRisk',

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
                let key = request.payload.key
                let irs = request.payload.irs
                let price = request.payload.price
                let user = userInfo.username
                let creationDate = new Date();

                console.log("(setRisk)APPROVED IRS CONTRACT", key, irs, user, creationDate);

                let pre = ''

                request.server.log('info', 'Uploading file')

                // obtain DATE dinamically
                //hay que cambiar la función de la línea 8 por una de tipo sendIsda, storeBigFile se ha usado para comprobar que los datos se envíar correctamente

                await factory[blockchain].setRisk(key, irs, user, creationDate, token)

                pre = 'todolistRisk'
                return h.redirect('/todolistRisk?pre=' + pre)
            }
        }
    }
]
