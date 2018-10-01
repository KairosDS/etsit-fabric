'use strict';

const FabricFacade = require('./fabricFacadeImpl')

module.exports = {
    fabric: new FabricFacade()
}