const mongoose = require('mongoose');
//build in module mongoose 
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User'); //userscheme to be import


//register fucntion  help to store the data in database

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.projectName = req.body.projectName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.type_user = req.body.type_user;
  
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);//find the duplicate email address
            else
                return next(err);
        }

    });
}


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
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','projectName']) });
        }
    );
}

module.exports.userrequest = (req, res, next) =>{
    User.find({},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','projectName','type_user']) });
        }
    );
}

