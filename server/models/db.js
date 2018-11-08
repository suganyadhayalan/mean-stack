require('./user.model'); 
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URI1, (err) => {
    if (!err) {
    //successfull connection    
        console.log('Mongogdb connection successfull'); 
    }
    //error in connection
    else { 
        console.log('error in mongodb connection: ' + JSON.stringify(err, undefined, 2));
    
    }
    
});

