'use strict';

const Path = require('path')

const Hapi = require('hapi')

const plugins = require('./modules/plugins')
const routes = require('./routes')

const Handlebars = require('handlebars')

const server = new Hapi.Server({
    host: '0.0.0.0', 
    port: 8000
})

const viewsPath = Path.resolve(__dirname, 'views')
const layoutPath = Path.resolve(viewsPath, 'layout')
const partialsPath = Path.resolve(viewsPath, 'partials')
const helpersPath = Path.resolve(viewsPath, 'helpers')

const liftOff = async () => {

    await server.register(plugins)
    server.log('info', 'Plugins registered')

    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;
    server.log('info', 'Session expired configured')

    server.auth.strategy('session', 'cookie', {
        password: 'S23fTv*fG/81axpow83.j1APkxr500ga',
        cookie: 'sid-pharmacy',
        redirectTo: '/login',
        isSecure: false,
        validateFunc: async (request, session) => {

            const cached = await cache.get(session.sid);
            const out = {
                valid: !!cached
            };

            if (out.valid) {
                out.credentials = cached.account;
            }

            return out;
        }
    });
    // server.auth.default('session');
    server.log('info', 'Auth strategy registered')

    server.views({
        engines: { html: Handlebars },
        path: viewsPath,
        layout: 'default',
        layoutPath: layoutPath,
        partialsPath: partialsPath,
        helpersPath: helpersPath,
        isCached: process.env.NODE_ENV === 'production',
        context: {
            appTitle: 'Pharmacy'
        }
    })
    server.log('info', 'Views configured')

    server.route(routes)
    server.log('info', 'Routes registered')

    try {
        await server.start()
        server.log('info', `Server running at ${server.info.uri}`)
    } catch (ex) {
        server.log('error', 'Error starting server ' + ex)
    }
};

liftOff()