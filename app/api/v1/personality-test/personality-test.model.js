let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const PersonalityTestSchema = new Schema({
    title: String, 
    description: String,
    imagePath: String,
    createdTime: {type: Date, default: Date.now()}, 
    createdBy: {type: ObjectId, ref: 'user'}
});

PersonalityTestSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.PersonalityTestModel = mongoose.model('personality-Test', PersonalityTestSchema);