// give the path to the router

const express = require('express');
const router = express.Router();//configure the router inside the application
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

//post everyday in the register function
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);

//private jwt route using verifyJwtToken property
router.get('/loginsuccess',jwtHelper.verifyJwtToken, ctrlUser.loginsuccess);

module.exports = router;

