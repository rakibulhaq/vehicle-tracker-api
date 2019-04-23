const BaseController = require('../base').BaseController;
const ImageHandler = require('./image.handler');

class ImageController extends BaseController {
    constructor() {
        super();
        this._ImageHandler = new ImageHandler();
        this._passport = require('passport');
    }
    
    upload(req, res, next) {
        this._ImageHandler.uploadImage(req, this._responseManager.getDefaultResponseHandler(res));
        // this.authenticate(req, res, next, () => {
           
        // });

    }
    remove(req, res, next) {
        this._ImageHandler.deleteImage(req, this._responseManager.getDefaultResponseHandler(res));
        // this.authenticate(req, res, next, () => {
            
        // });

    }
    authenticate(req, res, next, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);

    }

}

module.exports = ImageController;
