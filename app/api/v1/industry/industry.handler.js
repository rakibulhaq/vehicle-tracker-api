const IndustryModel = require('./industry.model').IndustryModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const ObjectId = require('mongoose').Types.ObjectId;
class IndustryHandler{
    constructor(){
        this._validator = require('validator');
    }

    createIndustryInfo(req, callback){
        let data = req.body;
        let industry = new IndustryModel({
            name : data.name,
            description: data.description,
            icon_img_path: data.icon_img_path
        });

        return new Promise((resolve, reject)=>{
            IndustryModel.find({name : data.name}, (err, someIndustry)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someIndustry.length){
                        reject(new AlreadyExistsError('Industry Already Exists'));

                    }
                    else{
                        resolve(industry);
                    }
                }

            });
        })
        .then((data)=>{
            data.save();
            return data;
        })
        .then((saved)=>{
            callback.onSuccess(saved);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }

    getIndustryInfo(req, callback){
        let industryId = req.params.id;
        req.checkParams('id', 'invalid id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new ValidationError("There are some validation errors: "+ errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    IndustryModel.findById( industryId, (err, industry)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!industry){
                                return new NotFoundError("Industry Not found");
                            }
                            else{
                                resolve(industry);
                            }
                        }
                    });
                });
            }
        })
        .then((industry)=>{
            callback.onSuccess(industry);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateIndustry(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            IndustryModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
                if(err){
                    reject(err);

                }
                else{
                    resolve(saved);
                }
            });
        })
        .then((saved)=>{
            callback.onSuccess(saved);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    deleteIndustry(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Industry: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    IndustryModel.findOneAndDelete(id, (err, industry)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(industry);
                        }
                    });
                });  
            }
        })
        .then((industry)=>{
            callback.onSuccess(industry);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllIndustry(req, callback){
        //operation=List&order=asc&limit=3&page=1
        //operation=Specific&industries=[{"id1"}, {"id2"}, ...]
        return new Promise((resolve, reject)=>{
            if(typeof req.query.operation != 'undefined' && req.query.operation == 'List'){
                IndustryModel.find({})
                .sort({'name' : req.query.order})
                .skip((parseInt(req.query.page) - 1) * parseInt(req.query.limit))
                .limit(parseInt(req.query.limit))
                .exec((err , docs)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(docs);
                    }
                });
            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'Specific'){

                console.log(typeof req.query.industries)
                console.log(req.query.industries)

                let someIndustries = req.query.industries.split(',')
                let industryArray = someIndustries.map((eachElem) => {
                    return new ObjectId(eachElem)
                });
                console.log(industryArray)
                IndustryModel.find({_id : {$in : [industryArray] }})
                .sort({'name' : req.query.order})
                .exec((err , docs)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(docs);
                    }
                });

            }
            else{
                IndustryModel.find({}, (err , docs)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(docs);
                    }
                });

            }
            
        })
        .then((docs)=>{
            callback.onSuccess(docs);
        })
        .catch((error)=>{
            callback.onError(error);
        });
    }
}
module.exports = IndustryHandler;