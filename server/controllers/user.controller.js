const mongoose = require('mongoose');
//build in module mongoose 
const passport = require('passport');
const _ = require('lodash');
User = mongoose.model('User','client'); //userscheme to be import, client collection

//const User1 = mongoose.model('User','ops');  //userscheme to be import, ops collection

//register fucntion  help to store the data in database

module.exports.register = (req, res, next) => {
    //const io = req.app.get('io');
    var user = new User();
    user.fullName = req.body.fullName;
    user.projectName = req.body.projectName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.type_user = req.body.type_user;
  
    user.save((err, doc) => {
        if (!err)
        {
           // io.emit('update-msg');
            //console.log("userconnection success");
            res.send(doc);
        }
            else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);//find the duplicate email address
            else
                return next(err);
        }

    });
}
/*
//using socket.io in userrequest page
module.exports.registers = (req, res, next) => {
    const io = req.app.get('io');
    var user = new User();
  user.fullName = req.body.fullName;
    user.projectName = req.body.projectName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.type_user = req.body.type_user;
      user.save((err, doc) => {
        if (!err)
        {
            io.emit('update-msg');
            console.log("userconnection success in registers");
            res.send(doc);
        }
            else {
                return next(err);
        }

    });
}
*/

//accept user
module.exports.acceptuser = (req, res, next) => { 
    //console.log(req.body.email);
    
    //console.log(query[email]);

    /*
    user.email = req.body.email;
    console.log(User.email);
*/
    //console.log(user);
    //console.log("success"); { email: User.email }
    User.findOneAndUpdate({ email: "" },{ $set: { value_flag: 'true' }}, { new: true }, function(err,doc) {
        if(err) {
            console.log(err);
        }
        else{
        console.log("update accept field ");
            //console.log("no error");
            //console.log(user.email);

        }});

}; 
 /*  var user = new User();
    console.log("succes enter");
    console.log(user[0].fullName);
            //console.log(fullName);
    //return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','projectName','type_user']) });

            };

    var user = new User();
    user.fullName = res.send.fullName;
    user.projectName = res.send.projectName;
    //fullName = user.sendfullName;
    //value_flag = user.send.value_flag;
 //   console.log(user.fullName);
    var fullName = user.res.fullName;
    var value_flag = user.res.value_flag;
   // console.log("change the status");
 //   var query = { fullName: 'sder89' };
    //console.log(query);
   //user.findOneAndUpdate({fullName: 'sder89'}, {fullName: 'bar'}).then((updatedDoc) => {})

  //  user.findOneAndUpdate(query, { value_flag: 'true' }); 
user.findOneAndUpdate(query, { $set: { value_flag: 'true' }}, { new: true, runvalidator: true, rawResult:true }, function(err, doc){
    if(err){
        console.log("Error updating data!");
    }
    else {
    console.log("update successfully");
    console.log(user.value_flag);
    console.log(doc);
    res.send(doc);
    //res.send(doc);
    }

});



   
    user.client.updateOne(
        { value_flag : false },
        {
          $set: { value_flag : true }
         
        }
     );
*/
  

//authentication 
module.exports.authenticate = (req, res, next) => {
//call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req, res);

}

//after authorization successfull page to be display

module.exports.loginsuccess = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','projectName','type_user']) });
        }
    );
}

module.exports.userrequest = (req, res, next) =>{
    //if flag= false then only display the value
    User.find({value_flag: false},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else 
            {
            const io = req.app.get('io');
            io.emit('update-msg');
            console.log("userconnection success in userrequest()");    
            return res.send(user);
            }
        }
    );
}

/*
module.exports.userrequests = (req, res, next) =>{
    User.find({},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
            ///console.log("succes enter");
            //console.log(user[0].fullName);//console.log(fullName);
                return res.send(user); 
        
        }
    );
}
*/

/*
module.exports.userrequest = (req, res, next) =>{
    User.findOne({ value_flag: false },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
            ///console.log("succes enter");
            //console.log(user[0].fullName);//console.log(fullName);
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','projectName','type_user']) });
        }
    );
}
*/

/*
//var M = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
mongoose.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("singup");
  dbo.collection("client").find().limit(5).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); 
*/