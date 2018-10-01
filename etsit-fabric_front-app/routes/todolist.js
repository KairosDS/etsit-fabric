'use strict';

const factory = require('../services/facadeFactory')

module.exports = [
    {
        method: 'GET',
        path: '/todolist',
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

                let response = await factory[blockchain].getAllIsda(token, key);
                    console.log("(getAllIsda) MODELO TODOLIST: 1 " + key + " ya");

                if (!response.data.includes('Error: 2')) { // && response.data.authorizations) {
                    console.log(response);
                    model.docs = response.data;
                    console.log("MODELO TODOLIST: ", model);
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                // if (_.includes(userInfo.roles, 'LAB')) {

                return h.view('todolist', model)
            }
        }
    },

    {
        method: 'GET',
        path: '/todolist/{key}',
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

                if (response.data) { // && response.data.authorizations) {
                    let auth = response.data.authorizations
                    model.data = response.data;
                    model.pdf = responsePDF.data;
                    console.log("MODELO VIEW TODOLIST: ", model);
                }

                return h.view('todolistView', model)
            }
        }
    },
    {
        method: 'POST',
        path: '/todolist',

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
                let creationDate = new Date();

                console.log("APPROVED ISDA CONTRACT", key, creationDate);


                let pre = ''

                request.server.log('info', 'Uploading file')

                // obtain DATE dinamically
                //hay que cambiar la función de la línea 8 por una de tipo sendIsda, storeBigFile se ha usado para comprobar que los datos se envíar correctamente

                await factory[blockchain].setIsda(key, creationDate, token)

                pre = 'todolist'
                return h.redirect('/todolist?pre=' + pre)
            }
        }
    }
]