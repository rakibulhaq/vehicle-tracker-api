let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserPermissionSchema = new Schema({
    user: {type: ObjectId, ref : 'user'},
    permissions : [{type: ObjectId, ref: 'permission'}]
});

module.exports.UserPermissionModel = mongoose.model('UserPermission', UserPermissionSchema);