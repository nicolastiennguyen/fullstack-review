const axios = require('axios');
const config = require('../config.js');

// returns a promise
let getReposByUsername = async (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // try catch which will catch an error upon failed get request
  try {
    const data = await axios.get(options.url, options.headers);
    return data;
  } catch (e) {
    return false;
  }


  const data = await axios.get(options.url, options.headers);
  return data;
}

module.exports.getReposByUsername = getReposByUsername;

/*
let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(options.url, options.headers)
    .then(res => {
      if (res.status !== 200) {
        console.log('username does not exist');
      } else {
        callback(null, res);
      }
    })

}
*/