const mongoose=require('mongoose')
//const { seats } = require('../frontend/src/data')
const TicketSchema=new mongoose.Schema({
    movie:{type:String},
    slot:{type:String},
    seats:{
        A1:{type:Number},
        A2:{type:Number},
        A3:{type:Number},
        A4:{type:Number},
        D1:{type:Number},
        D2:{type:Number}
    }
})
const Ticket=mongoose.model('bookmovie',TicketSchema)
module.exports =Ticket
