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
                let name = request.payload.name
                let age = request.payload.age

                console.log("UPLOADED DATA", key, name, age);

                let pre = ''

                request.server.log('info', 'Uploading file')

                // obtain DATE dinamically

                await factory[blockchain].addUser(key, name, age, token)

                pre = 'update'
                return h.redirect('/upload?pre=' + pre)
            }
        }
    }
]
