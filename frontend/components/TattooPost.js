import styles from "../styles/ImagePost.module.css";

function TattooPost(props) {
  const { tattoos, onBgCilck } = props;
  return (
    <div className={styles.Imagepost}>
      <div className={styles.Imagepostbg} onClick={onBgCilck}></div>
      <div className={styles.Imagepostcontent}>
        <img src={tattoos.thumbnailUrl} />
        <h4>{tattoos.title}</h4>
      </div>
    </div>
  );
}

export default TattooPost;
