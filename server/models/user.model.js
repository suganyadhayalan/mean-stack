const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty',
        minlength : [4, 'fullname must be atleast 4 character long'],
        maxlength : [10, 'maximum length below 10 character long']
    },
    projectName: {
        type: String,
        required: 'Project name can\'t be empty',
        minlength : [3, 'projectname must be atleast 3 character long'],
        maxlength : [15, 'maximum length']
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long'],
        maxlength : [15]
    },
   saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

/*
userSchema.path('password').validate((val) => {

    passwordregex= "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}" ;
    return passwordregex.test(val);
}, 'invalid password pattern');

*/
/*
function generateSalt() {
    //return Math.round((new Date().valueOf() * Math.random())) + '';
    Crypto.randomBytes('256', function(err, buf) {
        if (err) throw err;
        return buf;
    });
    // return Crypto.randomBytes('256'); // fails to
}

userSchema.pre('save', function(next)
{
    var crypto = require('crypto');
    function hashpassword(password, salt) {
      var sum = crypto.createHash('sha256');
      var salt = generateSalt();

      sum.update(password + salt);
      return 'sha256$'+ sum.digest('hex');
    }
});

*/


userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


mongoose.model('User', userSchema);