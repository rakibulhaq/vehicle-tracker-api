let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let bcrypt = require('bcrypt');
let schema = mongoose.Schema;
let emailValidator = require('validator').isEmail;

const UserSchema = new schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 35, trim: true },
    lastName: { type: String, required: true, minlength:2, maxlength:35, trim: true },
    email: { type: String, required: true, validate: {validator: emailValidator, message : 'Invalid Email', isAsync: false} },
    age: { type: Number, required: true },
    sex: { type: String },
    hashedPassword: { type: String, required: true},
    skills: [{type: ObjectId, ref: 'skill', default: null}],
    level: {type: ObjectId, ref : "user_level", default: null},
    tier: {type: ObjectId, ref : "user_tier", default: null},
    type: String,
    isMentor: {type: Boolean, default: false},
    points: Number,
    createdTime: Date,
    updatedTime: { type: Date, default: Date.Now },
    status: { type: String, lowercase: true }
});

UserSchema.methods.toJSON = function () {
    let object = this.toObject();
    delete object.hashedPassword;
    delete object.__v;
    return object;
};

UserSchema.virtual('id')
    .get(function () {
        return this._id;
    });
//password getter and setter
UserSchema.virtual('password')
    .set(function (password) {
        this.hashedPassword = this.encryptPassword(password, 10);
    })
    .get(function () {
        return this.hashedPassword;
    });
//methods to ecrypt password
UserSchema.methods.encryptPassword = function(password , saltRound){
     return bcrypt.hashSync(password, saltRound);
};
UserSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password, this.hashedPassword);
};

module.exports.User = mongoose.model('User', UserSchema);