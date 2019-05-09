let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let bcrypt = require('bcrypt');
let schema = mongoose.Schema;
let emailValidator = require('validator').isEmail;

const UserSchema = new schema({
    userName: {type: String, required: true},
    name: { type: String, minlength: 2, maxlength: 35, trim: true },
    email: { type: String, default: "" },
    phone: { type: String, default: ""},
    age: { type: Number, default: 0 },
    sex: {type: String, default: "N/A"},
    imageUrl: {type: String, default: ""},
    address: {type: String, default: ""},
    company: {type: String, default: ""},
    designation: {type: String, default: ""},
    experience: [{designation : { type: String, default: ""}, company : {type: String, default: ""}, duration: {type: "", default: ""}}],
    education: [{university : {type: String, default: ""}, subject : {type: String, default: ""}, duration: {type: String, default: ""}}],
    bio: {type: String, default: ""},
    references: [{name: {type: String, default: ""}, designation: {type: String, default: ""}, company: {type: String, default: ""}}],
    recommendations: [{name : {type: String, default: ""}, imageUrl: {type: String, default: ""}, designation: {type: String, default: ""}, company: {type: String, default: ""}}],
    university: {type: String, default: ""},
    employmentStatus : {type: String, default: ""},
    mentorLevel: {type: String, default: ""},
    mentorPoints: { type: Number, default: 0 },
    hourlyRate: { type: Number, default: 0 },
    services: [{type: ObjectId, ref: 'Service'}],
    mentoringCounts: { type: Number, default: 0 },
    mentorRating : { type: Number, default: 0.0 },
    schedules: [
        {
            date: Date, 
            timeSlots: [
                {
                    type : String
                }
            ]
        }
    ] ,
    hashedPassword: { type: String, required: true},
    skills: [{type: ObjectId, ref: 'Skill', default: null}],
    topSkills: [{type: ObjectId, ref: 'Skill', default: null}],
    industry: [{type: ObjectId, ref: 'Industry'}],
    level: {type: ObjectId, ref : "UserLevel", default: null},
    tier: {type: ObjectId, ref : "UserTier", default: null},
    type: {type: String, default: ""},
    isMentor: {type: Boolean, default: false},
    isMentoring: {type: Boolean, default: false},
    mentoringPlaces: [{type: String}],
    points: { type: Number, default: 0 },
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