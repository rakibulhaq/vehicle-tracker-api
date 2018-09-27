let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const PermissionSchema = new Schema({
    name: String,
    levelRequired: {type: Number, default: 1}
});

PermissionSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.PermissionModel = mongoose.model('Permission', PermissionSchema);