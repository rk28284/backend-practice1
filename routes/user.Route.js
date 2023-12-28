const express = require("express");
const UserModel = require("../model/user.Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authentication } = require("../middleware/auth.middleware");

require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register",authentication, async (req, res) => {
  const { username,email, password,name, phone } = req.body;
    try {
      bcrypt.hash(password, 5, async (err, security) => {
        if (err) {
          console.log(err);
        } else {
          const user = new UserModel({
            username,
            email,
            name,phone,
            password: security,
           
          });
          
          await user.save();
          res.json(user)
        }
      });
    } catch (error) {
      res.send({ message: "error in registering the user" });
    }
 
});

userRouter.post("/login",authentication, async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashpassword = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashpassword, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0].id }, process.env.key);
          res.send({ messsage: "Login successful", token: token });
        } else {
          res.send({ messsage: "Wrong credentials..try again" });
        }
      });
    } else {
      res.send({ messsage: "credentials are wrong" });
    }
  } catch (error) {
    res.send({ messsage: "something went wrong,try again" });
  }
});

module.exports = { userRouter };
