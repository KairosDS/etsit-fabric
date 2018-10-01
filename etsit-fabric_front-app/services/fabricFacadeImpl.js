'use strict';

const axios = require('axios')
const BlockChainFacade = require('./blockchainFacade')

module.exports = class FabricFacade extends BlockChainFacade {

    constructor() {
        super('http://localhost:4000')
        this.channel = 'mychannel'
        this.ChaincodesEnum = {
            ARM: 'arm',
            LAB: 'lab',
            ARF: 'arf',
            PHA: 'pha',
            CERTS: 'etsit'
        }
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

//  storeBigFile(key, fichero, startDate, endDate, owner, counterPartyA, counterPartyB, namePartyA, namePartyB, signatureDateA, signatureDateB, counterpartyUser, token)

async addUser(key, name, age, token) {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const params = {
        peers: ["peer0.org1.etsit.com"],
        fcn: "addUser",
        args: [key, name, age] // Saved in ARM order
        // args: [name, address, owner, createDate]
    }

    try {
        const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}`, {
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

    async storeBigFile(key, file, startDate, endDate, owner, counterpartyUser, counterPartyA, counterPartyB, namePartyA, namePartyB, signatureDateA, signatureDateB, token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            peers: ["peer0.org1.etsit.com"],
            fcn: "storeBigFile",
            args: [key, file, startDate, endDate, owner, counterpartyUser, counterPartyA, counterPartyB, namePartyA, namePartyB, signatureDateA, signatureDateB] // Saved in ARM order
            // args: [name, address, owner, createDate]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}`, {
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

    async storeIRS(key, irs, operationDate, finalDate, startDate, endDate, counterpartya, counterpartyb, qtyfixed, qtyvariable, years, paymentype, fixedpayment, variablepayment, owner, counterpartyUser, nominal, token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            peers: ["peer0.org1.etsit.com"],
            fcn: "storeIRS",
            args: [key, irs, operationDate, finalDate, startDate, endDate, counterpartya, counterpartyb, qtyfixed, qtyvariable, years, paymentype, fixedpayment, variablepayment, owner, counterpartyUser, nominal] // Saved in ARM order
            // args: [name, address, owner, createDate]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}`, {
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

    async updateBigFile(key, startDate, endDate, counterPartyA, counterPartyB, namePartyA, namePartyB, signatureDateA, signatureDateB, token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            peers: ["peer0.org1.etsit.com"],
            fcn: "updateBigFile",
            args: [key, startDate, endDate, counterPartyA, counterPartyB, namePartyA, namePartyB, signatureDateA, signatureDateB] // Saved in ARM order
            // args: [name, address, owner, createDate]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}`, {
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

    async setIsda(key, sDate, token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            peers: ["peer0.org1.etsit.com"],
            fcn: "setIsda",
            args: [key, sDate] // Saved in ARM order
            // args: [name, address, owner, createDate]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}`, {
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

    async setIrs(key, irs, user, sDate, price,  token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            peers: ["peer0.org1.etsit.com"],
            fcn: "setIrs",
            args: [key, irs, user, sDate, price] // Saved in ARM order
            // args: [name, address, owner, createDate]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}`, {
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

    async setRisk(key, irs, user, sDate, token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            peers: ["peer0.org1.etsit.com"],
            fcn: "setRisk",
            args: [key, irs, user, sDate] // Saved in ARM order
            // args: [name, address, owner, createDate]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}`, {
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

    async getBigFile(key, token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getBigFile",
            args: [key] // This ARM1 is created by default
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getIrsFile(key, user, token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getIrsFile",
            args: [key, user] // This ARM1 is created by default
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args[0]}%22%2C%22${params.args[1]}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getTest(token, id) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getTest",
            args: [id] // This ARM1 is created by default
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async verifyTest(token, questionary, answer, username) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            peers: ["peer0.org1.etsit.com"],
            fcn: "verifyTest",
            args: [username, questionary, answer] // Saved in ARM order
            // args: [name, address, owner, createDate]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}`, {
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

    async getTestResult(token, id, username) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getTestResult",
            args: [username, id] // This ARM1 is created by default
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args[0]}%22%2C%22${params.args[1]}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getResultDetails(token, id, username) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getTestResultDetails",
            args: [username, id] // This ARM1 is created by default
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args[0]}%22%2C%22${params.args[1]}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getAnswerDetails(token, id, username) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getAnswerDetails",
            args: [username, id] // This ARM1 is created by default
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args[0]}%22%2C%22${params.args[1]}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getAllTests(token, username) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getAllTestsByUser",
            args: [username]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getAllKeys(token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getAllKeys",
            args: ['']
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getAllIsda(token, username) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getAllIsda",
            args: [username]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getAllIsdaOwner(token, username) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getAllIsdaOwner",
            args: [username]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getAllIsdaIRS(token, username) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getAllIsdaIRS",
            args: [username]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
                status: 'success',
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error'
            }
        }
    }

    async getAllIRS(token, username) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const params = {
            fcn: "getAllIRS",
            args: [username]
        }

        try {
            const response = await axios(`channels/${this.channel}/chaincodes/${this.ChaincodesEnum.CERTS}?peer=peer0.org1.etsit.com&fcn=${params.fcn}&args=%5B%22${params.args}%22%5D`, {
                method: 'get',
                data: params,
                headers
            })

            return {
                code: response.status,
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
