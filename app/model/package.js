let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const PackageSchema = new Schema({
    name: String,
    description: String,
    code: String,
    isActive: {type: Boolean, default: false},
    type: String,
    components: [{type: ObjectId, ref: 'component'}]
});

PackageSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.PackageModel = mongoose.model('Package', PackageSchema);