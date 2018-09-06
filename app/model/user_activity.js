let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
const UserActivitySchema = new Schema({
user: {type: ObjectId, ref: 'user'},
activity : {type: ObjectId, ref: 'activity'},
acitivtyTimeStart: Date,
acitivtyTimeEnd: Date,
activityDescription: String,
pointsAwarded: Number
});

module.exports.UserActivityModel = mongoose.model('UserActivity', UserActivitySchema);