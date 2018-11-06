require('./user.model'); 
const mongoose = require('mongoose');

//connect to the mongodb
 
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

const User = mongoose.model('User');

  module.exports.dbconnection = (req, res, next) =>{
    var uservalue = new User();
    uservalue.type_user = req.body.type_user;
   //print the type of user
    console.log("click the user type",uservalue.type_user);
    console.log("check the database connection");
 if (uservalue.type_user == "ops")
{
    //console.log(uservalue.type_user);
    
    mongoose.connect(process.env.MONGODB_URI2, (err) => {
        if (!err) {
        //successfull connection    
            console.log('Mongogdb connection successfull in ops db'); 
            //query
          
           uservalue.fullName = req.body.fullName;

           uservalue.projectName= req.body.projectName;
           uservalue.email = req.body.email;
           uservalue.password = req.body.password;
                   uservalue.type_user =  req.body.type_user;
                   //save data in database
          uservalue.save(function(error){
              console.log("data saved in database in ops");
              if(error){
                  console.error(error);
              }

          });
           
        }
        //error in database connection
        else { 
            console.log('error in mongodb connection: ' + JSON.stringify(err, undefined, 2));
        
        }
        
    });
}
//client database 
else
{
    console.log("type of user",uservalue.type_user);
    mongoose.connect(process.env.MONGODB_URI1, (err) => {
        if (!err) {
        //successfull connection    
            console.log('Mongogdb connection successfull in signup or client db'); 
            uservalue.fullName = req.body.fullName;

            uservalue.projectName= req.body.projectName;
            uservalue.email = req.body.email;
            uservalue.password = req.body.password;
                    uservalue.type_user =  req.body.type_user;
          uservalue.save(function(error){
              console.log("data saved in database in signup");
              if(error){
                  console.error(error);
              }

          });
           
        }
        //error in connection
        else { 
            console.log('error in mongodb connection: ' + JSON.stringify(err, undefined, 2));
        
        }
        
    });
}
}



