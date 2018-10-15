const mongoose = require('mongoose');
//build in module mongoose 

const User = mongoose.model('User'); 

//register fucntion  help to store the data in database

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.projectName = req.body.projectName;
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