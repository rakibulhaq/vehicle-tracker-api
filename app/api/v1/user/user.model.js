let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let bcrypt = require('bcrypt');
let schema = mongoose.Schema;
let emailValidator = require('validator').isEmail;

const UserSchema = new schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 35, trim: true },
    lastName: { type: String, required: true, minlength:2, maxlength:35, trim: true },
    email: { type: String, required: true, validate: {validator: emailValidator, message : 'Invalid Email', isAsync: false} },
    phone: { type: String, default: ""},
    age: { type: Number, default: 0 },
    sex: { type: String },
    imageUrl: {type: String, default: ""},
    address: String,
    company: String,
    designation: String,
    mentorLevel: String,
    mentorPoints: Number,
    hourlyRate: Number,
    services: [{type: ObjectId, ref: 'service'}],
    mentoringCounts: Number,
    mentorRating : Number,
    schedules: [{date: Date, timeSlots: [{type : String}]}] ,
    hashedPassword: { type: String, required: true},
    skills: [{type: ObjectId, ref: 'skill', default: null}],
    industry: [{type: ObjectId, ref: 'industry'}],
    level: {type: ObjectId, ref : "user-level", default: null},
    tier: {type: ObjectId, ref : "user-tier", default: null},
    type: String,
    isMentor: {type: Boolean, default: false},
    isMentoring: {type: Boolean, default: false},
    mentoringPlaces: [{type: String}],
    points: Number,
    createdTime: Date,
    updatedTime: { type: Date, default: Date.Now },
    status: { type: String, lowercase: true, default: "active" }
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