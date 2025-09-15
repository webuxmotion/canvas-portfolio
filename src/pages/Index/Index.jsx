import { animations } from "../../App";
import { Link } from "react-router-dom";
import styles from "./Index.module.scss";
import GithubIcon from "./GithubIcon";
import Books from "../Books/Books";

function Index() {
  return (
    <div>
      <div className={styles.grid}>
        {animations.map((el) => (
          <div key={el.id} className={styles.card}>
            <Link to={el.id} className={styles.link}>
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
            {el?.codeSource && (
              <a
                className={styles.externalLink}
                href={`https://github.com/webuxmotion/canvas-portfolio/tree/main/src/pages/homepage-animations/${el.codeSource}`}
                target="_blank"
              >
                <GithubIcon />
              </a>
            )}
          </div>
        ))}
      </div>
      <Books />
    </div>
  );
}

export default Index;
