var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var User = require('../models/User.model');


router.post('/login', async (req, res) => {
  var { email, password } = req.body;
  let ifUserFounded = await User.findOne({ email: email });
  if (!ifUserFounded) {
    return res.send("User not found");
  }
  let isPasswordMatched = await bcrypt.compare(password, ifUserFounded.password);
  if (!isPasswordMatched) {
    return res.send("Password is not matched");
  } else {
    return res.send({
      status: "success",
      data: ifUserFounded
    });
  }
});

router.post('/register', async (req, res) => {
  var { email, employeeName, phoneNumber, dob, password, userName } = req.body;
  let ifUserFounded = await User.findOne({ email: email });
  if (ifUserFounded) {
    return res.send("User already exist");
  }
  let hashedPassword = await bcrypt.hash(password, 10);
  let user = new User({
    employeeName: employeeName,
    phoneNumber: phoneNumber,
    dob: dob,
    password: hashedPassword,
    userName: userName,
    email: email,
  });
  let dataSaved = await user.save();
  if (dataSaved) {
    return res.send("User registered successfully");
  } else {
    return res.send("Somthing went wrong user is not registered due to error");
  }
})







module.exports = router;