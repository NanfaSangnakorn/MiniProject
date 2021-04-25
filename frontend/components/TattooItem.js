import styles from "../styles/data.module.css";

function TattooItem(props) {
  const { tattoos, onTattooCilck } = props;

  return (
    <div className={styles.data3}>
      <img
        src={tattoos.thumbnailUrl}
        onClick={() => {
          onTattooCilck(tattoos);
        }}
      />
      <br />
      <br />
      <h4>{tattoos.title}</h4>
    </div>
  );
}

export default TattooItem;
