const express = require('express');
let app = express();
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
// let controllers = require('./controllers/repos.js')
let helper = require('../helpers/github.js')
let db = require('../database')

// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database
app.post('/repos', function (req, res) {
  // console.log(req.body.username)
  const repos = helper.getReposByUsername(req.body.username);
  if (repos === false) res.sendStatus(400);
  // console.log(repos)

  repos
  // value.data is an array of objects
  // with each object being the repo information
    .then((value) => {
      // console.log(value.data)
      db.save(value.data);
    })
    .catch((error) => {
      console.log('error saving information to database')
    })
});

// This route should send back the top 25 repos
// app.get('/repos', function (req, res) {
//   controllers.get(req, res);
// });

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

