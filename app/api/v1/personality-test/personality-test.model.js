let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const CareerTestSchema = new Schema({
    title: String, 
    description: String,
    imagePath: String,
    createdTime: {type: Date, default: Date.now()}, 
    createdBy: {type: ObjectId, ref: 'user'}
});

CareerTestSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.CareerTestModel = mongoose.model('Career-Test', CareerTestSchema);