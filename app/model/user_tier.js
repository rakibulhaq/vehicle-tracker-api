let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserTierSchema = new Schema({
    name: String,
    isActive: {type: Boolean, default: false}
});

UserTierSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.UserTierModel = mongoose.model('UserTier', UserTierSchema);