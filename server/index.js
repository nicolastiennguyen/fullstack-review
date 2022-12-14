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
app.post('/repos', (req, res) => {
  console.log(req.body.username)
  const repos = helper.getReposByUsername(req.body.username);
  if (repos === false) return res.sendStatus(400);

  repos
    .then((value) => {
      // console.log('value: ', value);
      db.save(value.data);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error saving information to database');
    })
});

// This route should send back the top 25 repos
app.get('/repos', (req, res) => {
  db.getRepos((err, repos) => {
    if (err) {
      console.log('error getting repos from database in server/index.js');
    } else {
      res.status(200).json(repos);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

