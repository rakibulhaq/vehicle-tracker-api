'use strict'
const BaseError = require(APP_ERROR_PATH + 'base');

class ForbiddedError extends BaseError{
    constructor(message){
        super(message, 403);
    }
}
module.exports = ForbiddedError;