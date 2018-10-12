const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {console.log('MOngogdb connection successfull'); }
    else { console.log('error in mongodb connection: ' + JSON.stringify(err, undefined, 2));}
});

require('./user.model'); 