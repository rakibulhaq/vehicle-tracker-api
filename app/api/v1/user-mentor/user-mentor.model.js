let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserMentorSchema = new Schema({
    //name, id, image, designation,skills[], address, Company,sector, service[],rating,Price/Rate per hour
    user: {type: ObjectId, ref : 'User'},
    industry: [{type: ObjectId, ref: 'Industry'}],
    mentorLevel: String,
    mentorPoints: Number,
    hourlyRate: Number,
    services: [{type: ObjectId, ref: 'Service'}],
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