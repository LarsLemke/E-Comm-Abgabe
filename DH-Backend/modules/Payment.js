const mongoose = require('mongoose');


const PaymentSchema = mongoose.Schema({
    subType : {
        type: String,
        require: false,
    },
    paymentType: {
        type: String,
        require: false,
    },
    endDate: {
        type: Date,
        require: false,
    },
    referenceId: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('Payment', PaymentSchema);