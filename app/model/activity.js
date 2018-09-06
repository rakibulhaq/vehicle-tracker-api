let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    name: String,
    points: Number,
    type: String,
    isActive: {type: Boolean, default: true}
});

module.exports.ActivityModel = mongoose.model('Activity', ActivitySchema);