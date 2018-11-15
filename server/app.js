require('./config/config');
require('./models/db');
require('./config/passportConfig');
require('./controllers/user.controller');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

//websocket
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

//routes
const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());//communite two port nodejs and angular
app.use(passport.initialize());
app.use('/api', rtsIndex);

//creareserver
const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io);
app.use(express.static(path.join(__dirname, 'project')));


// error handle
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


// start server
server.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
