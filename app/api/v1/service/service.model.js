let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const ServiceSchema = new Schema({
    name: String,
    createdBy: {type: ObjectId, ref:'User'},
    createdTime: Date
});

ServiceSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.ServiceModel = mongoose.model('Service', ServiceSchema);