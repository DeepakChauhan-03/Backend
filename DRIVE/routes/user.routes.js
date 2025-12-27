const express = require('express');
const router = express.Router();
//password bcrypt
const bcrypt = require('bcrypt');
//JWT
const jwt = require('jsonwebtoken');

//Validator
const { body , validationResult} = require('express-validator');
const user = require('../models/user.model');

router.get("/register",(req,res)=>{
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail().isLength({min:12}),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3})
    ,async(req,res)=>{
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({
        errors:errors.array(),
        message:"invalid data"
    })
    }
    
    const {email,username,password} = req.body;

    //password hash
    const hashPassword = await bcrypt.hash(password,10);

    const newUser = await user.create({
        email,
        username,
        password:hashPassword
    })

    res.json(newUser)
})
//Login Router
router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',async(req,res)=>{
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async(req,res)=>{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
    return res.status(400).json({
        errors:errors.array(),
        message:"Invalid data"
    })
    }
}

const { username, password } = req.body

const User = await user.findOne({
    username: username
})
if(!User){
    return res.status(400).json({
        message:'Username or Password is incorrect'
    })
}
//password matching
const isMatch = await bcrypt.compare(password, User.password);
if(!isMatch){
    return res.status(400).json({
        message:'username or Password is incorrect'
    })
}
//JSON WEB TOKEN
const token = jwt.sign({
    userId:user._id,
    email:user.email,
    username:user.username
},
process.env.JWT_SECRETE,
)

res.cookie('token',token)

res.send('Logged in')

})


module.exports = router;