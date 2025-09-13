import { Link, Outlet } from "react-router-dom";
import { animationsList } from "../animationsList";

export default function LambertaPetersLayout() {
  return (
    <div>
      <h1>Based on "Foundation HTML5 Animation with JavaScript" animations:</h1>
      <div style={{ display: "flex" }}>
        {/* Example: sidebar or navigation */}
        <aside
          style={{ width: "200px", background: "#f4f4f4", padding: "1rem" }}
        >
          <h3>Books Animations</h3>
          <ul>
            {animationsList.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/books-animations/based-on/labmerta-peters/${item.id}`}
                >
                  {item.id}
                </Link>
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
