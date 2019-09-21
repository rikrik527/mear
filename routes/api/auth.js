const express = require('express'); 
const router = express.Router();
const auth = require('../../middleware/auth')
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')
// route get api/auth
//acess public
router.get('/',auth,async(req,res)=>{
    try{
     const user = await User.findById(req.user.id).select('-password')
      console.log(user)
    res.json(user)
    }catch(err){
         console.error(err.message)
         res.status(500).send("Server Error");
    }
})
// post api/auth
// authenticate user and get token
// public
router.post('/',[
 
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log('!errors.isEmpty()')
        return res.status(400).json({ errors:errors.array()});
    }
    console.log(req.body)
    
    const {email,password}=req.body

    try{
 // see if user exists
    let user = await User.findOne({email})
    if(!user){
        console.log('there is no user email')
         return res
         .status(400)
         .json({errors:[{msg:'Invalid Credentials'}]});
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        console.log('password does not match',password +'^___^' +user.password)
        return res
        .status(400)
        .json({errors:[{msg:'Invalid Credentials'}]});
    }
    
     // return jsonwebtoken
     const payload ={
         user:{
             id:user.id
         }
     }

    jwt.sign(payload, config.get('jwtSecret'),{
        expiresIn:3600000
    },(err,token)=>{
        console.log("payload",payload)
        if(err) throw err
         res.json({token});
    })
    }catch(err){
        console.log("payload",payload)
        console.error(err.message)
        res.status(500).send("Server error")
    }
   
})

module.exports = router