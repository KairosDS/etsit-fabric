'use strict';

const factory = require('../services/facadeFactory')

const db = require('../db')

module.exports = [
    {
        method: 'GET',
        path: '/items',
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

                if (request.query.pre) {
                    model.successMsg = 'Item created successfully'
                }

                // let result = await factory[blockchain].queryItems(token)

                // if (result.data && result.data.laboratory) {
                //     model.mlab = result.data.laboratory
                //     model.mlab.map((l) => {
                //         l.owner = result.data.owner
                //     });
                // }

                return h.view('create', model)
            }
        }
    },
    {
        method: 'POST',
        path: '/items',
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
                let type = request.payload.type
                let desc = request.payload.desc

                await factory[blockchain].createItem(key, type, desc, token)

                return h.redirect('/items?pre=create')
            }
        }
    }
]
