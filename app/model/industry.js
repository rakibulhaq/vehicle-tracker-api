let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const IndustrySchema = new Schema({
    name: String,
    description: String,
    icon_img_path: String
});

module.exports.IndustryModel = mongoose.model('Industry', IndustrySchema);