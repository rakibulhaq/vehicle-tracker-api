let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserMentorSchema = new Schema({
    user: {type: ObjectId, rel : 'user'},
    skills: [{type: ObjectId, rel: 'skill'}],
    industrySubsection: [{type: ObjectId, rel: 'industry_subsection'}],
    mentorLevel: String,
    mentorPoints: Number,
    isMentoring: {type: Boolean, default: false},
    mentoringCounts: Number,
    mentorRating : Number
});

module.exports.UserMentorModel = mongoose.model('UserMentor', UserMentorSchema);