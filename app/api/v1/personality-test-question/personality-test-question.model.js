let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
const optionSchema = new Schema({
    optionValue :  String,
    isCorrect : Boolean
});
const PersonalityTestQuestionSchema = new Schema({
    question: String, 
    answerType: {type: String , default: "yes-no"},
    answers: [optionSchema],
    category: String,
    createdTime: {type: Date, default: Date.now()}, 
    createdBy: {type: ObjectId, ref: 'user'}
});

PersonalityTestQuestionSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.PersonalityTestQuestionModel = mongoose.model('personality-test-question', PersonalityTestQuestionSchema);