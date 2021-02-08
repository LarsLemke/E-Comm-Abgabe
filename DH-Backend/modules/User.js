const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    email : {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    referenceId: {
        type: String,
        require: false,
    },
    admin: {
        type: Boolean,
        require: false,
    },
    
  
})

module.exports = mongoose.model('User', UserSchema);