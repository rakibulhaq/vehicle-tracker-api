const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base_autobind');
const RevokedTokenModel = require('./auth/revoked_token').RevokedTokenModel;
const ForbiddenError = require(APP_ERROR_PATH + 'forbidden');
const NotFoundError = require(APP_ERROR_PATH + 'invalid_payload');

let crypto = require('crypto');
const SHA_HASH_LENGTH = 64;

class AuthHandler extends BaseAutoBindedClass{
    constructor(){
        super();
        this._jwtTokenHandler = require('jsonwebtoken');
        this._authManager = require(APP_MANAGER_PATH + 'auth');
    }

    issueNewToken(req, user, callback){
        let that = this;
        if(user){
            let userToken = that._authManager.signToken("jwt-rs-auth", that._provideTokenPayload(user), that._provideTokenOptions());
            callback.onSuccess(userToken);
        }
        else{
            callback.onError(new NotFoundError('User Not Found'));
        }
    }

    revokeToken(req, user, callback){
        let that = this;
        req.checkParams('token' , 'Invalid Token Provided').notEmpty().isAlphanumeric().isLength(SHA_HASH_LENGTH);
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new ForbiddenError('Invalid Token Provided : ' + errorMessages.join( '&&'));
            }
            else{
                let tokenProvided = req.params.token;
                if(that.checkHashToken(token, tokenProvided)){
                    return new RevokedTokenModel({token : token});
                }
                else{
                    throw new ForbiddenError('Invalid Token Id provided');
                }

            }
        })
        .then((token)=>{
            token.save();
            return token;
        })
        .then((token)=>{
            callback.onSuccess('Revoked Token for user is Successful');
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }

    _hashToken(token){
        return crypto.createHash('sha256').update(token).digest('hex');
    }
    checkHashToken(token, hashed){
        let hasedValid = this._hashToken(token);
        return hasedValid === hashed;
    }
    _provideTokenPayload(user){
        return {
            id : user.id,
            scope : 'default'
        }

    }
    _provideTokenOptions(){
        let config = global.config;
        return {
            expiresIn : '10 days',
            audience: config.jwtOptions.audience,
            issuer: config.jwtOptions.issuer,
            algorithm: config.jwtOptions.algorithm
        }

    }
}

module.exports = AuthHandler;