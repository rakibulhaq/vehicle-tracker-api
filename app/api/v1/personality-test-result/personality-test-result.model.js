let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const PersonalityTestResultSchema = new Schema({
    userId: {type: ObjectId , ref: "User"},
    testId: {type: ObjectId , ref: "personality-test"},
    R: Number,
    I: Number,
    A: Number,
    S: Number,
    E: Number,
    C: Number,
    createdTime: {type: Date, default: Date.now()},
});

PersonalityTestResultSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.PersonalityTestResultModel = mongoose.model('personality-test-Result', PersonalityTestResultSchema);