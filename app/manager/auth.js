const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base_autobind');
const ForbiddenError = require(APP_ERROR_PATH + 'forbidden');
const JwtTokenModel = require('../api/v1/auth').JwtTokenModel;
const RevokedTokenModel = require('../api/v1/auth').RevokedTokenModel;
const JwtRsStrategy = require(APP_AUTH_STRATEGY_PATH + 'jwt_rs');
const CredentialsStrategy = require(APP_AUTH_STRATEGY_PATH + 'credentials');
const ExtractJwt = require('passport-jwt').ExtractJwt;

class AuthManager extends BaseAutoBindedClass{
    constructor(){
        super();
        this._passport = require('passport');
        this._jwtTokenHandler = require('jsonwebtoken');
        this._strategies = [];
        this._setupStrategies();
        this._setPassportStrategies();
    }

    _setupStrategies(){
        let jwtStrategy = new JwtRsStrategy(this._provideJwtOptions(), this._verifyRevokedToken);
        let credentialsStrategy = new CredentialsStrategy();

        this._strategies.push(jwtStrategy);
        this._strategies.push(credentialsStrategy);

    }
    _setPassportStrategies(){
        let passport = this._passport;
        this._strategies.forEach(function(strategy){
            passport.use(strategy);
        });

    }
    _provideJwtSecretKey(){
        let fs = require('fs');
        return fs.readFileSync(CONFIG_BASE_PATH + 'secret/jwt-key.pem', 'utf8');

    }
    _provideJwtPublicKey(){
        let fs = require('fs');
        return fs.readFileSync(CONFIG_BASE_PATH + 'secret/jwt-key.pub', 'utf8');

    }
    _provideJwtOptions(){
        let config = global.config;
        let jwtOptions = {};

        jwtOptions.issuer = config.jwtOptions.issuer;
        jwtOptions.audience = config.jwtOptions.audience;
        jwtOptions.privateKey = this._provideJwtSecretKey();
        jwtOptions.publicKey = this._provideJwtPublicKey();
        jwtOptions.extractJwtToken = ExtractJwt.fromAuthHeaderAsBearerToken();

        return jwtOptions;

    }
    _verifyRevokedToken(token, payload, callback){
        RevokedTokenModel.find({token : token}, function( err , docs){
            if(docs.length){
                callback.onFailure(new ForbiddenError('Token has been revoked'));
            }
            else{
                callback.onVerified(token, payload);
            }

        });

    }

    providePassport(){
        return this._passport;
    }
    extractJwtToken(req){
        return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    }
    getSecretKeyForStrategy(name){
        for (let index = 0; index < this._strategies.length; index++) {
            let strategy = this._strategies[index];
            if(strategy && strategy.name == name){
                return strategy.provideSecretKey();

            }
            
        }

    }
    signToken(strategyName, payload, options){
        let key = this.getSecretKeyForStrategy(strategyName);

        switch (strategyName) {
            case 'jwt-rs-auth':
                return new JwtTokenModel(this._jwtTokenHandler.sign(payload, key , options));                
            default:
                throw new TypeError('Cannot sign token for the '+ strategyName + "strategy");
        }

    }
}

module.exports = new AuthManager();