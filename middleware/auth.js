const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next){
  //get token
  const token = req.header('x-auth-token')
  
  // check if no token
  if(!token){
      console.log('no token form backend')
      return res.status(401).json({msg:"No token,authorization denied"});
  }
  // verify token
  try{
      const decoded = jwt.verify(token,config.get('jwtSecret'))
      req.user = decoded.user
      console.log('decoded.user',decoded.user,'decoded',decoded,'req =>user',req)
      next()
  } catch(err){
      console.log('token is not valid')
      res.status(401).json({msg:"Token is not valid"});
  }
}