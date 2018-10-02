'use strict';

const axios = require('axios')

module.exports = class BlockchainFacade {

    constructor(url) {
        axios.defaults.baseURL = url
    }

    async registerAndEnrollUser() {
        throw new Error('There is not implementation!')
    }

    async createItem() {
        throw new Error('There is not implementation!')
    }

    async queryItem() {
        throw new Error('There is not implementation!')
    }

}
