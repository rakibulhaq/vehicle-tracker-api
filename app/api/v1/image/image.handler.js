const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const ValidationError = require(APP_ERROR_PATH + 'validation');

class ImageHandler {
    constructor() {
        this._validator = require('validator');
    }

    
    uploadImage(req, callback) {
        let data = req.file;
        if(data.path){
            callback.onSuccess(data);
        }
        else{
            callback.onError(error);
        }

        // return new Promise((resolve, reject) => {
            
        // })
        //     .then((saved) => {
                
        //     })
        //     .catch((error) => {
                
        //     });

    }
    deleteImage(req, callback) {
        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map((elem) => {
                        return elem.msg
                    });
                    throw new ValidationError('There are some validation errors: ' + errorMessages);
                }

                return new Promise((resolve, reject) => {
                    //search for the image in the directory
                });
            })
            .then((Image) => {
                // delete the image
                return Image;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
}
module.exports = ImageHandler;