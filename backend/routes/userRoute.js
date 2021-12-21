const express = require("express")
const { registerUser, loginUser, logout } = require("../controllers/usersController")
const router = express.Router()
const User = require('../models/userModel')
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)

router.patch("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw new Error("user not found");
  
      const updates = Object.keys(req.body);
  
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
      res.json({ success: true, message: "profile updated", user });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });


  router.get("/user", async (req, res) => {
    try {
      const Userdata = await User.find();
      res.status(201).send(Userdata);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  });
  
  module.exports = router;