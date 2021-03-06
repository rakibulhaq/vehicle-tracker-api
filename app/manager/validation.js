const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base_autobind');
const expressValidator = require('express-validator');
class ValidationManager extends BaseAutoBindedClass{
    constructor(){
        super();
        this._validator = require('express-validator');
    }

    provideDefaultValidator(){
        return expressValidator({
            errorFormatter : ValidationManager.errorFormatter
        });
    }
    static errorFormatter(param, msg, value){
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

            while(namespace.length){
                formParam += '[' + namespace.shift() + ']';

            }
            return {
                param : formParam,
                msg : msg,
                value: value
            };

    }
}

module.exports = ValidationManager;