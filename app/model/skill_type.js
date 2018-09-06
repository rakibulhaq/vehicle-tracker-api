let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const SkillTypeSchema = new Schema({
    type: String,
    createdBy: {type: ObjectId, ref:'user'},
    createdTime: Date
});

module.exports.SkillTypeModel = mongoose.model('SkillType', SkillTypeSchema);