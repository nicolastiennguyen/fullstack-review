const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  owner_login: String,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

// This function should save a repo or repos to the MongoDB
let save = (repos) => {
  Repo.insertMany(repos)
    .then (() => {
      console.log("Data inserted")
    })
    .catch ((error) => {
      console.log(error)
    })
}

module.exports.save = save;