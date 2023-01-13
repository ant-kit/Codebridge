import React from 'react';
import styles from './ArticlePage.module.css';
import axios, * as others from 'axios';
import { Link } from 'react-router-dom';


let articlesMaper = (el) => {
    return el.map((el) => {
      return (
        <div key={el.id}>
          <SelectedArticle el={el} />
        </div>
      )
    })
}

const SelectedArticle = (props) => {
  return (
    <div>
      <img className={styles.image} src={props.el.imageUrl} />
      <div>
        <div><h2>{props.el.title}</h2></div>
        <div className={styles.title}>{props.el.summary}</div>
      </div>
    </div>
  )
}

const URLChanger = () => {
  let URL = window.location.toString();
  let URLArr = URL.split('/');
  let articleID = URLArr[URLArr.length-1]
  return articleID
}


class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {finishedDownload: false};
    this.selectedArticle = '';
  }
  
  componentDidMount = () => {
    axios.get(`https://api.spaceflightnewsapi.net/v3/articles/?id=${URLChanger()}`)
      .then(response => {
        this.selectedArticle = articlesMaper(response.data)
        this.setState({finishedDownload: true})
      })
  }
  
  render = () => {
    return (
      <div className={styles.articleWrapper}>
        <div className={styles.mainChild}>
          {this.selectedArticle}
          <div className={styles.backButton}>
            <Link className={styles.link} to='/'>&#60;Back to homepage</Link>
          </div>
        </div>
      </div>
    )
  }
}


export default ArticlePage;