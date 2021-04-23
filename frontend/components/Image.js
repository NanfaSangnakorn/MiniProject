
import styles from "../styles/data.module.css";


function Image(props) {

  const{to} = props
    
    return (
      <div className={styles.data3}>
        <img src={to.thumbnailUrl} />
        <br />
        <br />
        <h4>{to.title}</h4>
      </div>
    );
}

export default Image;