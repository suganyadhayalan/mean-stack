// give the path to the router

const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');


//post everyday in the register function
router.post('/register', ctrlUser.register);

module.exports = router;
