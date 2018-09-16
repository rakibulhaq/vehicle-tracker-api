const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RevokedTokenSchema = new Schema({
    token : String,
    date : {type: date, default : Date.now}
});

module.exports.RevokedTokenModel = mongoose.model('RevokeToken' , RevokedTokenSchema);