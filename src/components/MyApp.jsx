import React from 'react';
import styles from './MyApp.module.css';
import axios, * as others from 'axios';
import Article from './Article'


let articlesMaper = (el, keyword) => {
  return el.map((el) => {
    return (
      <div key={el.id} className={styles.article}>
        <Article el={el} keyword={keyword} />
      </div>
    )
  })
}


class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {finishedDownload: false, searchRequest: ''};
    this.articlesCollection = null;
  }

  componentDidMount = () => {
    axios.get(`https://api.spaceflightnewsapi.net/v3/articles/`)
      .then(response => {
        this.articlesCollection = articlesMaper(response.data, 'stubForKeyword')
        this.setState({finishedDownload: true})
      })
  }

  upSearchRequest = (e) => {
    this.setState({searchRequest: e.target.value})
  }

  request = (e) => {
    e.preventDefault();
    axios.get(`https://api.spaceflightnewsapi.net/v3/articles/?title_contains=${this.state.searchRequest}`)
      .then(response => {
        if(response.data.length === 0) {
          alert('Article with this word in the title was not found')
          return
        }
        this.articlesCollection = articlesMaper(response.data, this.state.searchRequest)
        this.setState({finishedDownload: true})
      })
  }

  render = () => {
    return (
      <div>
        <form className={styles.example} action="action_page.php" onSubmit={this.request}>
          <input type="text" placeholder="Search.." name="search" value={this.state.searchRequest} onChange={this.upSearchRequest}/>
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
        <div className={styles.appWrapper}>
          {this.articlesCollection}
        </div>
      </div>
    )
  }
}


export default MyApp;