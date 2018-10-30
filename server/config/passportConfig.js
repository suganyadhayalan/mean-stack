const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');
passport.use(
    new localStrategy({ usernameField: 'email' },
    (username, password, done) => {
        //for the authentication purpose email and password to be 
        User.findOne({ email: username },
            (err, user) => {
                if (err)
                return done(err);
                //unknown usee
                else if (!user)
                return done(null, false, { message: 'Email is not registered' });

                //wrong password
                else if (!user.verifyPassword(password))
                return done(null, false, { message: 'wrong password' });

                //authentication success
                else
                return done(null, user);
            
            });
    })
);