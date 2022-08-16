import React from 'react';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dbRepos = this.props.displayRepos.map((repo) => {
      return (<li>{repo.repo_name} created by {repo.username}</li>)
    })
    return(<div>
      <h4> Repo List Component </h4>
      There are {this.props.allRepos.length} total repos in the database.
      <h2> Here are the top 25 repos based on Stargazers:
        <ol>{dbRepos}</ol>
      </h2>
    </div>)
  }
}

export default RepoList;