const https = require('https');
const fs = require("fs");
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

// var users = [{username: "bj", password: "pass424"}];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const account = require('./src/account');
app.use('/account', account);

// app.post('/account/login', async (req, res) => { 
//   const username = req.body.username;
//   const password = req.body.password;
//   // TODO: uhh make this better...
//   users.forEach(function(user) {
//     if (user.username === username && user.password === password) {
//       res.status(200).end()
//     }
//   })
//   res.status(401).end()
// });

// app.post('/account/register', async (req, res) => { 
//   const username = req.body.username;
//   const password = req.body.password;

//   // check that username doesn't already exist
//   users.forEach(function(user) {
//     if (user.username === username) {
//       res.status(409).end()
//     }
//   })

//   // password rules
//   // - be at least 8 characters
//   // - contain at least one upper case letter
//   // - contain at least one lower case letter
//   // - contain at least one decimal digit
//   const passwordRegex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$/

//   if (password.match(passwordRegex)) {
//     users.push({username, password})
//     res.status(200).end()
//   }
//   res.status(400).end()
// });

https.createServer(
  {
    key: fs.readFileSync('../.cert/key.pem'),
    cert: fs.readFileSync('../.cert/cert.pem'),
  },
  app
).listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
})
