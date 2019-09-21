const express = require('express'); 
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require("../../models/Profile")
const User = require("../../models/User")
const request = require('request')
const config = require('config')
const { check, validationResult } = require('express-validator')
// route get api/profile/me
// get current users profile
//acess private
router.get('/me',auth,async(req,res)=>{
    try{
    const profile = await Profile.findOne({user:req.user.id}).populate(
        'user',
        ['name','avatar']
    )
    if(!profile){
        console.log("!profile")
        return res.status(400).json({msg:"There is no profile for this user"});
    }
    }catch(err){
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})
// route post api/profile
// create or update user profile
//acess private
router.post('/',[auth,[
    check('status','Status is required')
    .not()
    .isEmpty(),
    check('skills','Skills is required')
    .not()
    .isEmpty()
    
]],
  async (req,res)=>{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          console.log('is not empty')
          return res.status(400).json({errors:errors.array()});
      }
      const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
      } = req.body;
     // build profile object
     const profileFields = {}
     profileFields.user = req.user.id
     if(company)profileFields.company = company
     if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill=>skill.trim())
    }
    console.log(profileFields.skills)
     
    //build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try{
        let profile = await Profile.findOne({user:req.user.id})
        if(profile){
            console.log('profile',profile)
           //update
           profile = await Profile.findOneAndUpdate(
               {user:req.user.id},
               {$set: profileFields},
               {new: true},()=>{
                   console.log('findoneandupdate')
               }
               )
               return  res.json(profile);
        }
        //create
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)

    }catch(err){
        console.error(err.message)
        res.status(500).send("Server Error");
    }


  }
)
// get api/profile
// get all profile
// public
router.get('/',async(req,res)=>{
  try {
      const profiles = await Profile.find().populate('user',['name','avatar'])
      res.json(profiles)
      console.log('getting all profile')
  } catch (err) {
      console.error(err.message)
      res.status(500).send("Server error");
  }
})
// get api/profile
// get one profile
// public
router.get('/',async(req,res)=>{
    try {
        const profile = await Profile.find({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).json({msg:'Profile not found'},()=>{ 
                console.log('!profile')
            });
        }
        console.log('find one profile')
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Profile not found'});
        }
        res.status(500).send("Server error");
    }
  })

  // get api/profile
// delete profile,user,posts
// public
router.delete('/',auth,async(req,res)=>{
    try {
        // remove users posts

        //remove profile
        await Profile.findOneAndRemove({user:req.user.id})
        //remove user
        await User.findOneAndRemove({_id:req.user.id})
        res.status(500).json({msg:'User deleted'});
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error");
    }
  })

    // put api/profile/experience
// add profile to experience
// private
router.put('/experience',[auth,[
    check('title','Title is required')
    .not()
    .isEmpty(),
    check('company','Company is required')
    .not()
    .isEmpty(),
    check('from','From date is required')
    .not()
    .isEmpty()

]],async(req,res)=>{
 const errors = validationResult(req)
 if(!errors.isEmpty()){
     console.log('experience is not empty')
     return res.status(400).json({errors:errors.array()});
 }
 const {
     title,
     company,
     location,
     from,
     to,
     current,
     description
 } = req.body
 const newExp = {
     title,
     company,
     location,
     from,
     to,
     current,
     description
 }
 try {
    const profile = await Profile.findOne({user:req.user.id})
    profile.experience.unshift(newExp)
    console.log('post profile experience')
    await profile.save()
    res.json(profile) 
 } catch (err) {
     console.error(err.message)
     res.status(500).send('Server error');
 }
})
  // delete api/profile/experience/:exp_id
// delete profile to experience
// private
router.delete('/experience/:exp_id',auth,async (req,res)=>{
    try {
       const profile = await Profile.findOne({user:req.user.id})
       //remove index
       const removeIndex = profile.experience.map(item =>item.id).indexOf(req.params.exp_id)
       profile.experience.splice(removeIndex,1)
       console.log('delete one experience')
       await profile.save()
       res.json(profile) 
    } catch (err) {
        console.error(err.message)
     res.status(500).send('Server error');
    }
})
 // get api/profile
// delete profile,user,posts
// public
router.delete('/',auth,async(req,res)=>{
    try {
        // remove users posts

        //remove profile
        await Profile.findOneAndRemove({user:req.user.id})
        //remove user
        await User.findOneAndRemove({_id:req.user.id})
        res.status(500).json({msg:'User deleted'});
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error");
    }
  })

    // put api/profile/education
// add profile to education
// private
router.put('/education',[auth,[
    check('school','School is required')
    .not()
    .isEmpty(),
    check('degree','Degree is required')
    .not()
    .isEmpty(),
    check('fieldofstudy','Field of study is required')
    .not()
    .isEmpty(),
    check('from','From date is required')
    .not()
    .isEmpty()

]],async(req,res)=>{
 const errors = validationResult(req)
 if(!errors.isEmpty()){
     console.log('experience is not empty')
     return res.status(400).json({errors:errors.array()});
 }
 const {
     school,
     degree,
     fieldofstudy,
     from,
     to,
     current,
     description

 } = req.body
 const newEdu = {
    school,
    degree,
    fieldofstudy,
     from,
     to,
     current,
     description
 }
 try {
    const profile = await Profile.findOne({user:req.user.id})
    console.log(req.user.id)
    profile.education.unshift(newEdu)
    console.log('post profile education')
    await profile.save()
    res.json(profile) 
 } catch (err) {
     console.error(err.message)
     res.status(500).send('Server error');
 }
})
  // delete api/profile/education/:edu_id
// delete profile to education
// private
router.delete('/education/:edu_id',auth,async (req,res)=>{
    try {
       const profile = await Profile.findOne({user:req.user.id})
       //remove index
       const removeIndex = profile.education.map(item =>item.id).indexOf(req.params.edu_id)
       profile.education.splice(removeIndex,1)
       console.log('delete one education')
       console.log(req.parems.edu_id)
       await profile.save()
       res.json(profile) 
    } catch (err) {
        console.error(err.message)
     res.status(500).send('Server error');
    }
})
  // delete api/profile/github/:username
// get user repos from github
// public
router.get('/github/:username',(req,res)=>{
    try {
        const options={
            uri:`https://api.github.com/users/${
                req.params.username
              }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                'githubClientId'
              )}&client_secret=${config.get('githubSecret')}`,
            method:'Get',
            headers:{'user-agent':'node.js'}
        }
        request(options,(error,response,body)=>{
            if(error) console.error(error)
            if(response.statusCode !== 200){
                res.status(404).json({msg:'No github profile found'})
            }
            res.json(JSON.parse(body))
            console.log(response.statusCode,'body',response.body)
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error github');
    }
})
module.exports = router