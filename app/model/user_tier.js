let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserTierSchema = new Schema({
    name: String,
    isActive: {type: Boolean, default: false}
});

module.exports.UserTierModel = mongoose.model('UserTier', UserTierSchema);