let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const PermissionSchema = new Schema({
    name: String,
    levelRequired: {type: Number, default: 1}
});

module.exports.PermissionModel = mongoose.model('Permission', PermissionSchema);