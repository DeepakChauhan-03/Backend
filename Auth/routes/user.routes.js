const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

//hashPass
const bcrypt = require('bcrypt')


//create
router.post('/add', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password,10);

    const newUser = new User({
      username,
      email,
      password:hashPassword
    });

    const result = await newUser.save();  // <-- yaha data save hota hai

    res.status(201).json({
      success: true,
      message: "User created",
      data: result
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Read Route
router.get('/getuser',(req,res)=>{
  User.find().then((user)=>{
    res.send(user)
  })
})

//Update route
router.get('/update-user',async(req,res)=>{
  await User.findOneAndUpdate({
    username:"rahul"
  },
{
  email:"rahulchauhan@gmail.com"
})
res.send("User updated")
})

//Delete Route
router.get('/delete-user',async(req,res)=>{
  await User.findOneAndDelete({
    username:"ravi"
  })
  res.send("User deleted")
})


module.exports = router;
