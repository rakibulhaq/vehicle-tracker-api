let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserSessionSchema = new Schema({

    userId: {type: ObjectId, ref : 'user'},
    mentorId: {type: ObjectId, ref : 'user'},
    sessionStatus: {type: String, deafult: "Pending"},
    sessionRequestedTime:  Date,
    requestReviewedTime: Date,
    sessionStartTime: Date,
    sessionEndTime: Date,
    serviceOffered: [{type: ObjectId, ref: 'service'}],
    sessionSpot: String,
    sessionReviewUser: String,
    sessionRatingUser: Number,
    sessionReviewMentor: String,
    sessionRatingMentor: Number,
    paymentStatus: {type: String, deafult: "Pending"},
    paymentTime: Date,
    paymentMedium: String,
    remarks: String
});

UserSessionSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.UserSessionModel = mongoose.model('UserSession', UserSessionSchema);