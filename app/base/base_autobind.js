const autoBind = require('auto-bind');

class BaseAutobindedClass{
    constructor(){
        autoBind(this);
    }
}

module.exports = BaseAutobindedClass;