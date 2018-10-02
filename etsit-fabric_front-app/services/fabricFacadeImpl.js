'use strict';

const axios = require('axios')
const BlockChainFacade = require('./blockchainFacade')

module.exports = class FabricFacade extends BlockChainFacade {

    constructor() {
        super('http://localhost:4000')
        this.channel = 'mychannel'
        this.chaincode = 'etsit'
    }

    async registerAndEnrollUser(account) {

        const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        try {
            const response = await axios('users', {
                method: 'post',
                data: {
                    username: account.username,
                    orgName: account.org
                },
                config: config
            })

            const data = response.data;
            return {
                token: data.token
            }
        } catch (error) {
            return 'error'
        }
    }

    async createItem(key, type, desc, token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            peers: ["peer0.org1.etsit.com"],
            fcn: "addItem",
            args: [key, type, desc]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.chaincode}`, {
                method: 'post',
                data: params,
                headers
            })

            return {
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async queryItem(key, token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            peers: ["peer0.org1.etsit.com"],
            fcn: "queryItem",
            args: [key]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.chaincode}?peer=${params.peers}&fcn=${params.fcn}&args=%5B%22${params.args}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }
}
