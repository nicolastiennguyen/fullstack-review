import React from 'react';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dbRepos = this.props.repos.map((repo) => {
      return (<li>{repo.repo_name}</li>)
    })
    return(<div>
      <h4> Repo List Component </h4>
      There are {this.props.repos.length} repos.
      <h2> Here are the repos based on Stargazers:
        <ol>{dbRepos}</ol>
      </h2>
    </div>)
  }
}

export default RepoList;