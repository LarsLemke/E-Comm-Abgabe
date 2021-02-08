const mongoose = require('mongoose');


const GesundheitSchema = mongoose.Schema({
    referenceId: {
        type: String,
        require: false,
    },
    schmerzenNow: {
        type: Boolean,
        require: false,
    },
    schmerzenRuecken: {
        type: Number,
        require: true,
    },
    schmerzenNacken: {
        type: Number,
        require: true,
    },
    schmerzenHandgelenk: {
        type: Number,
        require: true,
    },
    schmerzenKnie: {
        type: Number,
        require: true,
    },
    schmerzenHuefte: {
        type: Number,
        require: true,
    },
    schmerzenSchulter: {
        type: Number,
        require: true,
    },
    schmerzenFussgelenke: {
        type: Number,
        require: true,
    },
    toggelBeweglichket: {
        type: Number,
        require: true,
    },
    schmerzenBrennen: {
        type: Boolean,
        require: true,
    },
    schmerzenKribbeln: {
        type: Boolean,
        require: true,
    },
    schmerzenTaubheit: {
        type: Boolean,
        require: true,
    },
    schmerzenUeberempfindlichkeit: {
        type: Boolean,
        require: true,
    },
    toggelkraft: {
        type: Boolean,
        require: true,
    },
    schmerzenNadeln: {
        type: Boolean,
        require: true,
    },
    schmerzenFeld: {
        type: String,
        require: false,
    },
    schmerzenArbeiten: {
        type: Boolean,
        require: true,
    },
    schmerzenLaufen: {
        type: Boolean,
        require: true,
    },
    schmerzenBuecken: {
        type: Boolean,
        require: true,
    },
    schmerzenStress: {
        type: Boolean,
        require: true,
    },
    schmerzenWetter: {
        type: Boolean,
        require: true,
    },
    schmerzenSpringen: {
        type: Boolean,
        require: true,
    },
   


 
  
    
  
})

module.exports = mongoose.model('Gesundheit', GesundheitSchema);