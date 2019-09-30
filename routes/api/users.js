const express = require('express'); 
const router = express.Router();
const gravatar = require('gravatar')
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')
// route post api/users
// reqister user
//acess public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log('!errors.isEmpty()')
        return res.status(400).json({ errors:errors.array()});
    }
    console.log(req.body)
    
    const {name,email,password}=req.body

    try{
 // see if user exists
    let user = await User.findOne({email})
    if(user){
        console.log('user already exists')
         return res.status(400).json({errors:[{msg:'User already exists'}]});
    }
    //get users gravatar
    const avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    })
    user = new User({
        name,
        email,
        avatar,
        password
    })
    

    //Encrypt password
     const salt = await bcrypt.genSalt(10)
     user.password = await bcrypt.hash(password,salt)
     await user.save()
     // return jsonwebtoken
     const payload ={
         user:{
             id:user.id
         }
     }

    jwt.sign(payload, config.get('jwtSecret'),{
        expiresIn:3600000
    },(err,token)=>{
        console.log(token)
        if(err) throw err
         res.json({token});
    })
    }catch(err){
        console.error('api/users/register err', err)
        res.status(500).send("Server error")
    }
   
})
module.exports = router