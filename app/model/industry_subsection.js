let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const IndustrySubsectionSchema = new Schema({
    name: String,
    description: String,
    industry: {type: ObjectId, rel : 'industry'}
});

module.exports.IndustrySubsectionModel = mongoose.model('IndustrySubsection', IndustrySubsectionSchema);