let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const PermissionSchema = new Schema({
    name: String,
    levelRequired: {type: ObjectId, default: null, ref: 'user_level'}
});

PermissionSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.PermissionModel = mongoose.model('Permission', PermissionSchema);