import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span>Canvas portfolio </span>
        <span>by Andrii Pereverziev</span>
      </Link>
      <Link to="/books-animations" className={styles.link}>Books Animations</Link>
      <Link to="/threejs-animations" className={styles.link}>Threejs Animations</Link>
    </div>
  );
}

export default Header;
