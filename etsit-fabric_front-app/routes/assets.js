'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/css/{file*}',
        handler: {
            directory: {
                path: 'assets/css'
            }
        }
    },

    {
        method: 'GET',
        path: '/images/{file*}',
        handler: {
            directory: {
                path: 'assets/images'
            }
        }
    }
]