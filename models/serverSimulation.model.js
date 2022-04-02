const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
    Message : String,
    isSent : Boolean,
    user : String
},{ timestamps: true });

const Simulations = mongoose.model('Simulations' , simulationSchema);

module.exports = {Simulations};