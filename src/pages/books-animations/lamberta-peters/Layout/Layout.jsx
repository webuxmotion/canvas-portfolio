import { NavLink, Outlet } from "react-router-dom";
import { animationsList } from "../animationsList";
import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <h1>Based on "Foundation HTML5 Animation with JavaScript" book:</h1>
      <div style={{ display: "flex" }}>
        {/* Example: sidebar or navigation */}
        <aside className={styles.sidebar}>
          <h3>Animations:</h3>
          <ul>
            {animationsList.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={`/books-animations/based-on/labmerta-peters/${item.id}`}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? "bold" : "normal",
                    color: isActive ? "#9aa3edff" : "#7179c5",
                    textDecoration: "none",
                  })}
                >
                  {item.id}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <section style={{ flex: 1, padding: "1rem" }}>
          <Outlet /> {/* <-- Nested routes will render here */}
        </section>
      </div>
    </div>
  );
}
