let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const TicketSchema = new Schema({
    name: String,
    type: String,
    createdTime: Date,
    createdBy: {type: ObjectId, ref: 'user'}
});

TicketSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.TicketModel = mongoose.model('Ticket', TicketSchema);