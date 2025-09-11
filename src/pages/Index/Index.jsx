import { animations } from "../../App";
import { Link } from "react-router-dom";
import styles from "./Index.module.scss";

function Index() {
  return (
    <div className={styles.grid}>
      {animations.map((el) => (
        <Link key={el.id} to={el.id} className={styles.card}>
          <div className={styles.videoWrapper}>
            <video
              src={`videos/animations/${el.id}.mp4`}
              autoPlay
              muted
              loop
              playsInline
              className={styles.video}
            />
            <span className={styles.label}>{el.id}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Index;
