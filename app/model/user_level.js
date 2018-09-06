let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserLevelSchema = new Schema({
    name: String,
    pointsRequired: Number
});

module.exports.UserLevelModel = mongoose.model('UserLevel', UserLevelSchema);