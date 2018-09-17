const HttpStatus = require('http-status-codes');
const BaseResponse = {
    "success" : false,
    "message" : "",
    "data" : {}
};

class ResponseManager {
    constructor(){

    }
    static get HTTP_STATUS(){
        return HttpStatus;
    }
    static getDefaultResponseHandler(res){
        return {
            onSuccess : function(data, message, code){
                ResponseManager.respondWithSuccess(res, code || ResponseManager.HTTP_STATUS.OK, data, message);

            },
            onError : function(error){
                ResponseManager.respondWithError(res, error.status || 500 , error.message || 'Unknown Error');

            }
        };

    }
    static getDefaultResponseHandlerData(res){
        return{
            onSuccess : function(data, message, code){
                ResponseManager.respondWithSuccess(res, code || ResponseManager.HttpStatus.OK , data, message);
            },
            onError : function(error){
                ResponseManager.respondWithErrorData(res, error.status || 500 , error.data, error.message);

            }
        }

    }

    static getDefaultReponseHandlerError(res, successCallback){
        return{
            onSuccess : function(data, code, message){
                successCallback(data, message, code);

            },
            onError : function(error){
                ResponseManager.respondWithError(res, error.status || 500, error.message || 'Unknown Error');

            }
        }

    }
    static getDefaultResponseHandlerSuccess(res, errorCallback ){
        return {
            onSuccess : function(data, code, message){
                ResponseManager.respondWithSuccess(res, code || ResponseManager.HTTP_STATUS.OK , data, message);

            },
            onError : function(error){
                errorCallback(error);

            }
        }

    }

    static respondWithSuccess(res, code , data, message =""){
        let response = Object.assign({}, BaseResponse);
        response.success = true;
        response.message =message;
        response.data = data;
        res.status(code).json(response);

    }
    static respondWithErrorData(res, errorCode, data, message = ""){
        let response = Object.assign({}, BaseResponse);
        response.success = false;
        response.message = message;
        response.data = data;
        res.status(errorCode).json(response);
    }
    static respondWithError(res, errorCode, message = ""){
        let response = Object.assign({}, BaseResponse);
        response.success = false;
        response.message = message;
        res.status(errorCode).json(response);
    }
}

module.exports = ResponseManager;