let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const PackageSchema = new Schema({
    name: String,
    description: String,
    code: String,
    isActive: {type: Boolean, default: false},
    type: String,
    components: [{item : {type: ObjectId, ref: 'component'}, count: {type: Number, default: 0}, unitPrice: {type: Number, default: 0}}],
    price : Number,
    saleCount : Number
});

PackageSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

PackageSchema.pre('save', function(next){
    var itemPrice = 0;
    var totalPrice = 0;
    let self = this;
    var arrayOfComponents = self.components;

    for (let index = 0; index < arrayOfComponents.length; index++) {
        itemPrice = arrayOfComponents[index].count * arrayOfComponents[index].unitPrice;
        totalPrice = totalPrice + itemPrice;
        
    }
    console.log("Called save pre hook");
    self.price = totalPrice;
    next();
});

module.exports.PackageModel = mongoose.model('Package', PackageSchema);