let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const IndustrySchema = new Schema({
    name: String,
    description: String,
    icon_img_path: String
});

IndustrySchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.IndustryModel = mongoose.model('Industry', IndustrySchema);