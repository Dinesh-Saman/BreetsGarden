const mongoose = require('mongoose');


const driverSchema = new mongoose.Schema({
 
  Dname: {
    type: String,
    required: true
  },

  Daddress: {
    type: String,
    required: true
  },
  Dcontactnumber: {
    type: String,
    required: true
  },
  dnic: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  GAge:{
    type:String,
    required: true
  },
  languagesSpeak:{
    type:String,
    required: true
  },
  Exprince: {
    type: String,
    required: true
  },
  
  
  
});


const Driver = mongoose.model('Driver', driverSchema);

module.exports =  Driver;