'use strict';

const Bcrypt = require('bcrypt')
const factory = require('../services/facadeFactory')

// test purposes
const db = require('../db')
let uuid = 1

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            let model = {
                medicines: db.medicines
            }
            return h.view('index', model)
        }
    },

    {
        method: ['GET', 'POST'],
        path: '/login',
        options: {
            auth: {
                mode: 'try', //para que no entre en bucle
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false //para que no entre en bucle
                }
            },
            handler: async (request, h) => {
                if (request.auth.isAuthenticated) {
                    return h.redirect('/dashboard')
                }

                let accountDb = null
                let account = {}
                let message = ''

                if (request.method === 'post') {
                    if (request.payload.username || request.payload.password) {
                        accountDb = db.users[request.payload.username]
                        if (!accountDb) {
                            message = 'Invalid username or password'
                        } else {
                            Object.assign(account, accountDb);
                            const isValid = await Bcrypt.compare(request.payload.password, account.password);
                            if (!isValid) {
                                message = 'Invalid username or password'
                            }
                        }
                    } else {
                        message = 'Missing username or password'
                    }
                }

                if (request.method === 'get' || message) {
                    const data = {
                        pepe: { role: 'pepe' }
                    };
                    return h.view('login', data)
                }

                const sid = String(++uuid)

                delete account.password

                // Get jwt token fabric api
                const back = await factory[account.blockchain].registerAndEnrollUser(account)

                account.token = back.token

                await request.server.app.cache.set(sid, { account }, 0)
                request.cookieAuth.set({ sid })

                return h.redirect('/dashboard');
            }
        }
    },

    {
        method: 'GET',
        path: '/logout',
        handler: (request, h) => {
            request.server.app.cache.drop(request.state['sid-pharmacy'].sid);
            request.cookieAuth.clear();
            return h.redirect('/');
        }
    },

    {
        method: 'GET',
        path: '/dashboard',
        options: {
            auth: {
                strategy: 'session'
            },
            handler: (request, h) => {
                const data = {
                    userInfo: request.auth.credentials
                }
                return h.view('dashboard', data)
            }
        }
    }
]