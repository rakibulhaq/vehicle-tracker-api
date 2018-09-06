let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserCouponSchema = new Schema({
    user: {type: ObjectId, ref: 'user'},
    coupon: {type: ObjectId, ref: 'coupon'},
    status: String,
    availedTime: Date
});

module.exports.UserCouponModel = mongoose.model('UserCoupon', UserCouponSchema);