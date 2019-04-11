let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const MessageSchema = new Schema({
    sessionId: {type: ObjectId, ref: 'user-session'},
    text: String, 
    sentBy: {type: ObjectId, ref: 'user'}, 
    sentTime: {type: Date, default: Date.now()}, 
    seenStatus: {type: String, default: "unseen"},
    seenTime: Date
});

MessageSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.MessageModel = mongoose.model('Message', MessageSchema);