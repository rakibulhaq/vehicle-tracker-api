let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserCouponSchema = new Schema({
    user: {type: ObjectId, ref: 'User'},
    coupon: {type: ObjectId, ref: 'Coupon'},
    status: String,
    availedTime: Date
});

UserCouponSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.UserCouponModel = mongoose.model('UserCoupon', UserCouponSchema);