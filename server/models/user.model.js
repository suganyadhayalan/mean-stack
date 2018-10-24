const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;
//const crypto = require('crypto');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty',
        minlength : [4, 'fullname must be atleast 4 character long'],
        maxlength : [20, 'maximum length below 20 character long']
    },
    projectName: {
        type: String,
        required: 'Project name can\'t be empty',
        minlength : [3, 'projectname must be atleast 3 character long'],
        maxlength : [20, 'maximum length']
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [8,'Password must be atleast 8 character long'],
        maxlength : [20]
    }
  // saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

userSchema.path('fullName').validate((val) => {
    //fullNameregex = /^[a-zA-Z0-9_]+$/;
    fullNameregex = /^([a-zA-Z0-9_]+)$/;
    return fullNameregex.test(val);
}, 'Invalid Username.');

userSchema.path('projectName').validate((val) => {
    //projectNameregex = /^[a-zA-Z0-9_-.,&]+$/;
    projectNameregex = /^([a-zA-Z0-9.,&_-]+)$/;
    return projectNameregex.test(val);
}, 'Invalid ProjectName.');

userSchema.path('password').validate((val) => {
    passwordregex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(([A-Za-z\d@$!%*#?&])\2?(?!\2))+$/;
    return passwordregex.test(val);
}, 'Invalid Password.');

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

mongoose.model('User', userSchema);