let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    name: String,
    points: Number,
    type: String,
    isActive: {type: Boolean, default: true}
});

ActivitySchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.ActivityModel = mongoose.model('Activity', ActivitySchema);