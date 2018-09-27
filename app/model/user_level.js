let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserLevelSchema = new Schema({
    name: String,
    pointsRequired: Number
});

UserLevelSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.UserLevelModel = mongoose.model('UserLevel', UserLevelSchema);