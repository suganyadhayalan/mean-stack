
require('./user.model'); 
const mongoose = require('mongoose');
//var ctrlUser1 = require('../controllers/user.controller');
//connect to the mongodb
 
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

const User1 = mongoose.model('User');
//console.log("check the connection");

//var typeuservalue = function (req, res, next) {
    module.exports.dbconnection = (req, res, next) =>{
    var uservalue = new User1();
    uservalue.type_user = req.body.type_user;
    console.log("click the user type",uservalue.type_user);

    console.log("check the database connection");
 if (uservalue.type_user == "ops")
{
    console.log("success in ops");
    //mongoose.connect(process.env.MONGODB_URI2);
    mongoose.connect(process.env.MONGODB_URI2, (err) => {
        if (!err) {
        //successfull connection    
            console.log('Mongogdb connection successfull in ops db'); 
        }
        //error in connection
        else { 
            console.log('error in mongodb connection: ' + JSON.stringify(err, undefined, 2));
        
        }
        
    });
}
else
{
    console.log(uservalue.type_user);
    //mongoose.connect(process.env.MONGODB_URI2);
    mongoose.connect(process.env.MONGODB_URI1, (err) => {
        if (!err) {
        //successfull connection    
            console.log('Mongogdb connection successfull in signup or client db'); 
        }
        //error in connection
        else { 
            console.log('error in mongodb connection: ' + JSON.stringify(err, undefined, 2));
        
        }
        
    });
}
}
/*
mongoose.connect(process.env.MONGODB_URI2, (err) => {
    if (!err) {
    //successfull connection    
        console.log('Mongogdb connection successfull'); 
    }
    //error in connection
    else { 
        console.log('error in mongodb connection: ' + JSON.stringify(err, undefined, 2));
    
    }
    
});
*/

//require('./controllers/user.controller');
//console.log(uservalue.type_user);
