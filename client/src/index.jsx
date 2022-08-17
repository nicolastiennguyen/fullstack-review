import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayRepos: [],
      allRepos: []
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    axios.get('/repos')
      .then((res) => {
        let top25Repos = res.data.slice(0, 25);
        this.setState({
          displayRepos: top25Repos,
          allRepos: res.data
        })
      })
  }

  search (term) {
    console.log(`${term} was searched`);
    axios.post('/repos', {username: term})
      .then(() => {
        console.log('post is working')
        return axios.get('/repos')
      })
      .then((res) => {
        console.log(res)
        let top25Repos= res.data.slice(0, 25);
        this.setState({
          displayRepos: top25Repos,
          allRepos: res.data
        })
      })
     .catch(e => console.error(e));
  };

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList
      displayRepos = {this.state.displayRepos}
      allRepos={this.state.allRepos}
      />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));