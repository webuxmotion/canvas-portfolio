import React from 'react'
import styles from "./AnimationsGrid.module.scss";
import { Link } from 'react-router-dom';
import GithubIcon from '@/pages/Index/GithubIcon';

function AnimationsGrid({ animations = [], folder = "" }) {
  return (
    <div className={styles.grid}>
        {animations.map((el) => (
          <div key={el.id} className={styles.card}>
            <Link to={el.id} className={styles.link}>
              <div className={styles.videoWrapper}>
                <video
                  src={`videos/animations/${folder}/${el.id}.mp4`}
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
                href={`https://github.com/webuxmotion/canvas-portfolio/tree/main/src/pages/${folder}/${el.codeSource}`}
                target="_blank"
              >
                <GithubIcon />
              </a>
            )}
          </div>
        ))}
    </div>
  )
}

export default AnimationsGrid