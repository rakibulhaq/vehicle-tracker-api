let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const SkillTypeSchema = new Schema({
    type: String,
    createdBy: {type: ObjectId, ref:'User'},
    createdTime: Date
});

SkillTypeSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.SkillTypeModel = mongoose.model('SkillType', SkillTypeSchema);