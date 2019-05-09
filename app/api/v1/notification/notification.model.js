let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const NotificationSchema = new Schema({
    userId: {type: ObjectId, ref: 'User'},
    text: String, 
    eventTime: {type: Date, default: Date.now()}, 
    seenStatus: {type: String, default: "unseen"},
    seenTime: {type: Date, default: null},
    type: String
});

NotificationSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.NotificationModel = mongoose.model('Notification', NotificationSchema);