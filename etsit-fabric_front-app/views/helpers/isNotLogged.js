'use strict';

const _ = require('lodash')

module.exports = (context) => {
    if (_.isEmpty(context)) {
        return context.inverse(this)
    }

    const user = context.data.root.userInfo

    if (user) {
        return context.inverse(this)
    }

    return context.fn(this)
}