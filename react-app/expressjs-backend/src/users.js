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

router.get('/all', async(req, res) => {
  const user = User;
  user.find({}, {_id: 0, username: 1}).then((result) => {
    if (result) {
      console.log(result);
      const everyone = result.map((item) => ({username: item.username, fav: false}));
      console.log(everyone);
      res.status(200).send(everyone).end();
      return
    }
    // username doesnt exist or wrong password
    res.status(404).send('Invalid login credentials').end();
  })
})

router.post('/contacts', async(req, res) => {
  const username = req.body.username;
  const user = User;
  console.log("trying to get contacts")
  console.log("username: " + username);
  user.find({}, {_id: 0, username: 1}).then(async (result_everyone) => {
    if (result_everyone) {
      console.log(result_everyone);
      const result_fav = await user.findOne({ username }, {_id: 0, favorites: 1})
      if (result_fav) {
        console.log(result_fav.favorites);
        let people = result_everyone.filter((item) => (item.username !== username));
        people = people.map((item) => (
          (result_fav.favorites.indexOf(item.username) != -1) ? 
            {username: item.username, fav: true}
          :
            {username: item.username, fav: false}
          ));
        console.log(people);
        res.status(200).send(people).end();
        return
      }
    }
    res.status(404).send('An error occured').end();
    return
  })
})

router.post('/addFav', async(req, res) => {
  const username = req.body.username;
  const add = req.body.add;
  const user = User;
  user.updateOne({username}, {$push:{"favorites": add}}).then((result) => {
    if (result) {
      console.log(result);
      res.status(200).end();
      return
    }
    res.status(404).send('An error occured').end();
    return
  })
})

router.post('/removeFav', async(req, res) => {
  const username = req.body.username;
  const add = req.body.add;
  const user = User;
  user.updateOne({username}, {$pull:{"favorites": add}}).then((result) => {
    if (result) {
      console.log(result);
      res.status(200).end();
      return
    }
    res.status(404).send('An error occured').end();
    return
  })
})

module.exports = router;
