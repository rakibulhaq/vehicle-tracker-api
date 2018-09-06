let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const CouponSchema = new Schema({
    name: String,
    discount: Number,
    validity: Date,
    isActive: {type: Boolean, default: false}
});

module.exports.CouponModel = mongoose.model('Coupon', CouponSchema);