let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const IndustrySubsectionSchema = new Schema({
    name: String,
    description: String,
    industry: {type: ObjectId, ref : 'industry', default: null}
});

IndustrySubsectionSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.IndustrySubsectionModel = mongoose.model('IndustrySubsection', IndustrySubsectionSchema);