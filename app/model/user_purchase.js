let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserPurchaseSchema = new Schema({
    user: {type: ObjectId, ref: 'user'},
    package: {type: ObjectId, ref: 'package'},
    purchaseCode: String,
    purchaseRating: Number,
    purchaseDate: Date,
    expiryDate: Date,
    isExpired: {type: Boolean, default: false}
});

module.exports.UserPurchaseModel = mongoose.model('UserPurchase', UserPurchaseSchema);