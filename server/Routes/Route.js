const express = require("express") ; 
const router = express.Router() ; 
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const {signup , login} = require('../Controllers/AuthController')

//  /allposts
//  /auth/login
//  /auth/signup
//  /post

router.post('/auth/signup', signupValidation , signup)
router.post('/auth/login',  login);


module.exports = router ; 