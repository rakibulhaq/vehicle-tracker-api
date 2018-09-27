let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types;

const UserTicketSchema = new Schema({
    user: {type: ObjectId , ref: 'user'},
    ticket: {type: ObjectId, ref: 'ticket'},
    ticketStatus: String,
    ticketAssignedTo: {type: ObjectId, ref: 'user'},
    ticketAssignedTime: Date,
    ticketAssignedBy: {type: ObjectId, ref: 'user'},
    ticketClosedBy: {type: ObjectId, ref: 'user'},
    ticketClosedTime: Date
});

UserTicketSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.UserTicketModel = mongoose.model('UserTicket', UserTicketSchema);