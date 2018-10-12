const mongoose = require('mongoose');

var userScheme = new mongoose.Schema({
fullName: {
    type: String
},
email: {
    type: String
},
password: {
    type: String
}

}); 
mongoose.model('User',userScheme);

