let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserMentorSchema = new Schema({
    user: {type: ObjectId, ref : 'user'},
    industrySubsection: [{type: ObjectId, ref: 'industry_subsection'}],
    mentorLevel: String,
    mentorPoints: Number,
    isMentoring: {type: Boolean, default: false},
    mentoringCounts: Number,
    mentorRating : Number
});

UserMentorSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.UserMentorModel = mongoose.model('UserMentor', UserMentorSchema);