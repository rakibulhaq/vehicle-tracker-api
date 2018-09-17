let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let bcrypt = require('bcrypt');
let schema = mongoose.Schema;

const UserSchema = new schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String },
    hashedPassword: { type: String, required: true },
    skills: [{type: ObjectId, ref: 'skill', default: null}],
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
    let object = this.toObject();
    delete object.hashedPassword;
    delete object.__v;
    return object;
};

UserSchema.virtual('id')
    .get(function () {
        return this._id;
    });
//password getter and setter, encryption will be added later. TODO
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

module.exports.UserModel = mongoose.model('User', UserSchema);