let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const SkillSchema = new Schema({
    name: String,
    type: {type: ObjectId, ref: 'skill_type'},
    industrySubsection: {type: ObjectId, ref: 'industry_subsection'}
});

module.exports.SkillModel = mongoose.model('Skill', SkillSchema);