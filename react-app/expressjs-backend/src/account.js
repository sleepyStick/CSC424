const express = require('express');
const dotenv = require('dotenv');

const router = express.Router();
const User = require('../models/user');
const argon2 = require("argon2");

const { makeToken } = require('../token');

const hashingConfig = { // based on OWASP cheat sheet recommendations (as of Feburary, 2023)
    parallelism: 1,
    memoryCost: 64000, // 64 mb
    timeCost: 3 // number of itetations
}

router.post('/login', async(req, res) => {
  const username = req.body.username;
  const password = req.body.crypt;
  const user = User;
  user.findOne({ username }).then(async (result) => {
    if (result) {
      try {
        const hashed = result.hash;
        if (await argon2.verify(hashed, password, hashingConfig)) {
          const token = makeToken({ username });
          res.status(200).send({ token }).end();
          return
        }
      } catch (err) {
        console.log(err);
        res.status(500).send('error').end();
        return
      }
    }
    // username doesnt exist or wrong password
    res.status(404).send('Invalid login credentials').end();
  })
})

router.post('/register', async (req, res) => { 
  console.log("in register");
  const username = req.body.username;
  const password = req.body.crypt;
  console.log(username);
  console.log(password);
  const user = User;
  try {
    // check that username doesn't already exist
    user.findOne({ username }).then(async (result) => {
      if (!result) {
        // username not taken, create account
        const hash = await argon2.hash(password, hashingConfig);
        const token = makeToken({ username, hash });
        const newUser = new User({ username, hash, token });
        newUser.save()
        res.status(200).send({ token }).end();
        return
      } else {
        console.log("username taken")
        res.status(409).send('Username is already taken.').end();
        return
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send('error').end();
    return
  }
});

module.exports = router;
