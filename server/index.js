const express = require('express');
let app = express();
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
let controllers = require('./controllers/repos.js')
let helper = require('../helpers/github.js')

// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database
app.post('/repos', function (req, res) {
  const repos = helper.getReposByUsername(req.body.username)
  if (repos === false) res.sendStatus(400);
    .then((repos) => {
      helper.save(repos);
    })
    .catch((error) => {
      console.log('error')
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

