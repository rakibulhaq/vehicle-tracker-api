let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const CouponSchema = new Schema({
    name: String,
    discount: Number,
    validity: Date,
    isActive: {type: Boolean, default: false}
});

CouponSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.CouponModel = mongoose.model('Coupon', CouponSchema);