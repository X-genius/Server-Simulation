const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
      userName : {type : String , max : 15},
      userId : {type : String}
});

const userSimulations = mongoose.model('userSimulations' , userSchema);

module.exports = {userSimulations};