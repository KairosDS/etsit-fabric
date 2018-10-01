'use strict';

const _ = require('lodash')

module.exports = (context) => {
    if (_.isEmpty(context)) {
        return context.inverse(this)
    }

    const user = context.data.root.userInfo

    if (user) {
        if (_.includes(user.roles, 'LAB')) {
            return context.fn(this)
        }
    }

    return context.inverse(this)
}