'use strict';

const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                request: '*',
                response: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout']
    }
}

module.exports = {
    plugin: require('good'),
    options
}