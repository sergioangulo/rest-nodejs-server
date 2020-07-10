const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let otaRefresh = new Schema({
    msisdn: {
        type: String,
        required: [true, 'El msisdn es mandatorio']
    },
    date: {
        type: String,
        required: [true, 'La fecha es mandatoria']
    }
});

module.exports = mongoose.model('OtaRefresh', otaRefresh);