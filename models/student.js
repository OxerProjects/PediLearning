const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    identify: {
        type: String,
        require: true
    }, 
    email: {
        type: String,
    },
    phonenumber: {
        type: String,
    }, 
    finished: {
        type: Boolean,
    },  
    password: {
        type: String,
        require: true
    },        
})

module.exports = mongoose.model('Student', studentSchema)