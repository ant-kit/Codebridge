import styles from './Article.module.css';
import { Link } from 'react-router-dom';

const Article = (props) => {

    const titleLength = props.el.title.length;
    const lengthLimit = 100;

    const createDate = (date) => {
        const conversionToDate = new Date(date);
        let dateArr = conversionToDate.toString().split(' ');

        return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`
    };

    const titleChanger = (title, keyword) => {
        let titleArr = title.split(' ');
        let modifiedTitle = titleArr.map((el) => {
            if(el.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())) {
                return <span className={styles.keyword}>{el} </span>
            }
            return <span>{el} </span>;
        })
        return <div>{modifiedTitle}</div>
    };

    const changeSummary = (text) => {
        return `${text.slice(0, lengthLimit-titleLength-3)}...`
    };

    return (
      <div className={styles.articleWrapper}>
        <img className={styles.image} src={props.el.imageUrl} />
        <div className={styles.content}>
            <div>{createDate(props.el.updatedAt)}</div>
            <div><h2>{titleChanger(props.el.title, props.keyword)}</h2></div>
            <div>{changeSummary(props.el.summary)}</div>
            <Link className={styles.link} to={`article/${props.el.id}`}>Read more&#62;</Link>
        </div>
      </div>
    )
}


export default Article;