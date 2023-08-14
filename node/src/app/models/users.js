const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const users= new Schema({
    username : {
        type : String,
        unique : true,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    name : {
        type : String,
        require : true
    },
    dateOfBirth : {
        type : Date,
        require : true
    },
    
    bio : {
        type : String,
        require : true,
        default : ''
    },
    location : {
        type : String,
        require : true,
        default : 'Viet Nam'
    },
    img : {
        type : String,
        require : true,
        default : ''
    },
    coin: {
        type : Number,
        require: true,
        default: 0
    },
    course: [
        {
            
            tenKH:{type : String, default: ''},
            gv:{type : String, default: ''},
            img:{type:String, default: ''}
        }
    ]   
    
}, {timestamps : true})

module.exports = mongoose.model('Users',users)