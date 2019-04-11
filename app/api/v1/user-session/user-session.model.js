let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserSessionSchema = new Schema({

    userId: {type: ObjectId, ref : 'user'},
    mentorId: {type: ObjectId, ref : 'user'},
    sessionStatus: {type: String, default: "Pending"},
    sessionRequestedTime:  {type: Date, default: null},
    requestReviewedTime: {type: Date, default: null},
    sessionStartTime: {type: Date, default: null},
    sessionEndTime: {type: Date, default: null},
    serviceOffered: [{type: ObjectId, ref: 'service'}],
    sessionSpot: String,
    sessionReviewUser: String,
    sessionRatingUser: Number,
    sessionReviewMentor: String,
    sessionRatingMentor: Number,
    paymentStatus: {type: String, default: "Pending"},
    paymentTime: {type: Date, default: null},
    paymentMedium: String,
    remarks: String
});

UserSessionSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.UserSessionModel = mongoose.model('UserSession', UserSessionSchema);