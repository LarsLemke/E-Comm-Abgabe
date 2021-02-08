const mongoose = require('mongoose');


const BeruftSchema = mongoose.Schema({
    computer : {
        type: Number,
        require: true,
    },
    bewegung: {
        type: Number,
        require: true,
    },
    auto: {
        type: Number,
        require: true,
    },
    heben: {
        type: Number,
        require: true,
    },
    sitzen: {
        type: Number,
        require: true,
    },
    referenceId: {
        type: String,
        require: false,
    },
  
    
  
})

module.exports = mongoose.model('Beruf', BeruftSchema);