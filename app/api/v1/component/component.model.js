let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ComponentSchema = new Schema({
    name: String,
    descriptionShort: String,
    descriptionFull: String,
    price: Number,
    isActive: {type: Boolean, default: false},
    imgPath: String,
    saleCount: Number,
    rating: Number
});

ComponentSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.ComponentModel = mongoose.model('Component', ComponentSchema);