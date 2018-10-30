const mongoose = require('mongoose');
//connect to the mongodb
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
    //successfull connection    
        console.log('Mongogdb connection successfull'); 
    }
    //error in connection
    else { 
        console.log('error in mongodb connection: ' + JSON.stringify(err, undefined, 2));
    
    }
    
});

require('./user.model'); 