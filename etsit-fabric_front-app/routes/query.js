'use strict';

const factory = require('../services/facadeFactory')

module.exports = [
    {
        method: 'GET',
        path: '/query',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: async (request, h) => {
                // Security info
                let userInfo = request.auth.credentials
                // let blockchain = userInfo.blockchain
                // let token = userInfo.token

                let model = {
                    userInfo
                }

                if (request.query.pre) {
                    model.successMsg = 'Completed Successfully'
                }

                return h.view('query', model)
            }
        }
    },
    {
        method: 'POST',
        path: '/query',
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

                let model = {
                    userInfo
                }

                let pre = ''

                let response = await factory[blockchain].queryItem(key, token)

                if (response.data && response.data.type) {
                    model.type = response.data.type
                    model.description = response.data.description
                }

                pre = 'update'
                return h.view('queryView', model)
            }
        }
    }
]
