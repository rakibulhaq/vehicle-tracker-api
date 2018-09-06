let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const TicketSchema = new Schema({
    name: String,
    type: String,
    createdTime: Date,
    createdBy: {type: ObjectId, ref: 'user'}
});

module.exports.TicketModel = mongoose.model('Ticket', TicketSchema);