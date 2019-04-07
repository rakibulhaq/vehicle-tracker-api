let mongoose = require('mongoose');
let skill = require('../skill/skill.model').SkillModel;
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserSkillSchema = new Schema({
    user: {type: ObjectId, default: null},
    skills: [{skill: {type: ObjectId, default: null, ref: skill}}]
});

UserSkillSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.UserSkillModel = mongoose.model('UserSkill', UserSkillSchema);