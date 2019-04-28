const LocalAuthStrategy = require('passport-local').Strategy;

const UserModel = require('../api/v1/user').UserModel;

const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const UnauthorizedError = require(APP_ERROR_PATH + 'unauthorized');

class CredentialsAuthStrategy extends LocalAuthStrategy{
    constructor(){
        super(CredentialsAuthStrategy.provideOptions(), CredentialsAuthStrategy.handleUserAuth);
    }

    get name(){
        return 'credentials-auth';
    }

    static handleUserAuth(userName, password, done){
        UserModel.findOne({userName: userName}, function(err, user){
            if (err){
                return done(err)

            }

            if(!user){
                return done(new NotFoundError('User Not Found'), false);

            }

            if(!user.comparePassword(password)){
                return done(new UnauthorizedError('Invalid Credentials'), false);

            }
            return done(null, user)

        });

    }

    static provideOptions(){
        return{
            usernameField : 'userName',
            passReqToCallback : false,
            passwordField : 'password',
            session : false
        }
    }

    getSecretKey(){
        throw new Error('No key is required for this auth strategy');

    }
}

module.exports = CredentialsAuthStrategy;