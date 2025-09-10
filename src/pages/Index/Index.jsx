import React from 'react'
import { animations } from '../../App'
import { Link } from 'react-router-dom'
import styles from "./Index.module.scss";

function Index() {
  return (
    <div>
        {animations.map((el) => (
        <Link key={el.id} to={el.id}>
          <span 
            style={{ backgroundImage: `url(images/animations/${el.id}.png)`}}
            className={styles.image}
          >
            {el.id}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Index