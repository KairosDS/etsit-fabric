'use strict';

const axios = require('axios')

module.exports = class BlockchainFacade {

    constructor(url) {
        axios.defaults.baseURL = url
    }

    async registerAndEnrollUser() {
        throw new Error('There is not implementation!')
    }

    async storeBigFile() {
        throw new Error('There is not implementation yet')
    }
    
    async getBigFile() {
        throw new Error('There is not implementation yet')
    }

    async getAllKeys() {
        throw new Error('There is not implementation yet')
    }

    async getTest() {
        throw new Error('There is not implementation yet')
    }

    async verifyTest() {
        throw new Error('There is not implementation yet')
    }

    async getTestResult() {
        throw new Error('There is not implementation yet')
    }

    async getAllTests() {
        throw new Error('There is not implementation yet')
    }

    async getResultDetails() {
        throw new Error('There is not implementation yet')
    }

    async getAnswerDetails() {
        throw new Error('There is not implementation yet')
    }

}
