'use strict';

const factory = require('../services/facadeFactory')

module.exports = [
    {
        method: 'GET',
        path: '/download',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                let blockchain = userInfo.blockchain
                let token = userInfo.token

                let response = await factory[blockchain].getAllKeys(token);

                let model = {
                    userInfo
                }

                if (!response.data.includes('Error: 2')) { // && response.data.authorizations) {
                    console.log(response);
                    model.docs = response.data;
                    console.log("(getAllKeys) MODELO DOWNLOAD: ", model);
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                // if (_.includes(userInfo.roles, 'LAB')) {

                return h.view('download', model)
            }
        }
    },

    {
        method: 'GET',
        path: '/download/{key}',
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

                let response = await factory[blockchain].getBigFile("Doc1", token);
                let responsePDF = await factory[blockchain].getBigFile(key, token);
                console.log("(getBigFile) MODELO VIEW DOWNLOAD key: ", key);


                if (response.data) { // && response.data.authorizations) {
                    let auth = response.data.authorizations
                    model.data = response.data;
                    model.pdf = responsePDF.data;
                    console.log("(getBigFile) MODELO VIEW DOWNLOAD: ", model);
                }

//                let response = await factory[blockchain].getBigFile(key, token);

//                if (response.data) { // && response.data.authorizations) {
//                    let auth = response.data.authorizations
//                    model.data = response.data;
//                    console.log("(getBigFile) MODELO VIEW DOWNLOAD: ", model);
//                }

                return h.view('downloadView', model)
            }
        }
    }
]