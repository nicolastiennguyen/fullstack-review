 const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  repo_name: String,
  username: String,
  repo_url: String,
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

// This function should save a repo or repos to the MongoDB
let save = (repos) => {
  return Promise.all(repos.map((repo) => {
    const filter = {id: repo.id}
    const update = {repo_name: repo.name, username: repo.owner.login, repo_url: repo.html_url, stars: repo.stargazers_count}
    return Repo.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    });
  }));
};

// let save = (repos) => {
//   Repo.insertMany(repos)
//     .then (() => {
//       console.log("Data inserted")
//     })
//     .catch ((error) => {
//       console.log(error)
//     })
// }

// This function should get repos from mongoDB
let getRepos = (callback) => {
  Repo.find({}).sort({stars: -1}).exec()
  .then((repos) => {
    callback(null, repos);
  })
}

module.exports.save = save;
module.exports.getRepos = getRepos;