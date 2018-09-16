const PassportStrategy = require('passport-strategy');
const jwt = require('jsonwebtoken');

const BaseAuthStrategy = require(APP_AUTH_STRATEGY + 'base');

class JwtRsStrategy extends BaseAuthStrategy{
    constructor(options, verify){
        super();
        this._options = options;
        this._customVerifier = verify;
        this._initStrategy();
    }
    _initStrategy(){
        PassportStrategy.Strategy.call(this);
        const options = this._options;
        if (!options){
            throw new TypeError('Jwt auth needs options');
        }

        this._privateKey = options.privateKey;
        if(!this._privateKey){
            throw new TypeError('Jwt auth needs a private key');

        }

        this._publicKey = options.publicKey;

        if(!this._publicKey){
            throw new TypeError('Jwt auth needs a public key');

        }

        this._extractJwtToken = options.extractJwtToken;
        if(!this._extractJwtToken){
            throw new TypeError('Jwt auth needs a Jwt Extractor Function');

        }

        this._verifyOpt = {};

        if(options.issuer){
            this._verifyOpt.issuer = options.issuer;

        }
        if(options.audience){
            this._verifyOpt.audience = options.audience;

        }
        if(options.algorithms){
            this._verifyOpt.algorithms = options.algorithms;
        }
        if(options.ignoreExpiration != null){
            this._verifyOpt.ignoreExpiration = options.ignoreExpiration;

        }
    }

    get name(){
        return 'jwt-rs-auth';
    }
    provideOptions(){
        return this._options;

    }
    provideSecretKey(){
        return this._privateKey;

    }
    authenticate(req, callback){
        let self = this;
        const token = self._extractJwtToken(req);

        if(!token){
           return callback.onFailure(new Error('No auth Token Provided'));
        }

        JwtRsStrategy._verifyDefault( token, this._publicKey, this._verifyOpt, function(jwt_err, payload){
            if (jwt_err){
                return callback.onFailure(jwt_err);
            }
            else{
                try {
                    if(self._customVerifier){
                        self._customVerifier(token, payload, callback);
                    }
                    else{
                        callback.onVerified(token, payload);
                    }
                } catch (error) {
                    callback.onFailure(error);
                    
                }
            }

        });




    }

    static _verifyDefault(token, publicKey, options, callback){
        return jwt.verify(token, publicKey, options, callback);

    }
}

module.exports = JwtRsStrategy;