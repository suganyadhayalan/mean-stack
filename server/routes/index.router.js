// give the path to the router

const express = require('express');
const router = express.Router();//configure the router inside the application
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');


//post in the register function
router.post('/register', ctrlUser.register);
//router.post('/registers', ctrlUser.registers);
router.post('/authenticate', ctrlUser.authenticate);

//private jwt route using verifyJwtToken property
router.get('/loginsuccess',jwtHelper.verifyJwtToken, ctrlUser.loginsuccess);
router.get('/userrequest', ctrlUser.userrequest);
//router.post('/userrequests', ctrlUser.userrequests);
router.post('/acceptuser',ctrlUser.acceptuser);

module.exports = router;

