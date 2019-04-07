let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const SkillSchema = new Schema({
    name: String,
    type: {type: ObjectId, ref: 'skill-type'},
    industrySubsection: {type: ObjectId, ref: 'industry-subsection'}
});

SkillSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.SkillModel = mongoose.model('Skill', SkillSchema);