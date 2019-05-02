let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types;

const UserTicketSchema = new Schema({
    user: {type: ObjectId , ref: 'User'},
    ticket: {type: ObjectId, ref: 'Ticket'},
    ticketStatus: String,
    ticketOpenBy: {type: ObjectId, ref: 'User'},
    ticketOpenTime: Date,
    ticketAssignedTo: {type: ObjectId, ref: 'User'},
    ticketAssignedTime: Date,
    ticketAssignedBy: {type: ObjectId, ref: 'User'},
    ticketClosedBy: {type: ObjectId, ref: 'User'},
    ticketClosedTime: Date
});

UserTicketSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.UserTicketModel = mongoose.model('UserTicket', UserTicketSchema);