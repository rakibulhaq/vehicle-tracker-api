let mongoose = require('mongoose');
let schema = mongoose.Schema;
const UserSchema = new schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String },
    password: { type: String, required: true },
    level: String,
    tier: String,
    type: String,
    isMentor: {type: Boolean, default: false},
    points: Number,
    createdTime: Date,
    updatedTime: { type: Date, default: Date.Now },
    status: { type: String, lowercase: true }
});

UserSchema.methods.toJSON = function () {
    let object = this.object;
    delete object.password;
    return object;
};

UserSchema.virtual('id')
    .get(function () {
        return this._id;
    });
//password getter and setter, encryption will be added later. TODO
UserSchema.virtual('password')
    .set(function () {
        this.password = password;
    })
    .get(function () {
        return this.password;
    });
//methods to ecrypt password
UserSchema.methods.encryptPassword = function(){
    //TODO
};
UserSchema.methods.comparePassword = function(){

};

module.exports.UserModel = new mongoose.model('User', UserSchema);