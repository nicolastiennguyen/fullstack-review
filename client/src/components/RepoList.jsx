import React from 'react';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dbRepos = this.props.displayRepos.map((repo) => {
      return (<li key = {repo.id}>
        <a href={repo.repo_url}>{repo.repo_name}</a> created by {repo.username}
        </li>)
    })
    return(<div>
      <h4> Repo List Component </h4>
      There are {this.props.allRepos.length} total repos in the database.
      <h3> Here's the Top {this.props.displayRepos.length} repos based on Stargazers:
        <ol>{dbRepos}</ol>
      </h3>
    </div>)
  }
}

export default RepoList;