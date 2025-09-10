import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span>Canvas portfolio </span>
        <span>by Andrii Pereverziev</span>
      </Link>
    </div>
  );
}

export default Header;
