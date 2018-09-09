'use strict';
const BaseError = require(APP_ERROR_PATH + 'base');

class NotImplementedError extends BaseError{
    constructor(message){
        super(message, 501);
    }
}

module.exports = NotImplementedError;