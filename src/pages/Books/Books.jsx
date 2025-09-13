import { Link } from "react-router-dom";
import { booksList } from "../books-animations/booksList";
import styles from "./Books.module.scss";

function Books() {
  return (
    <div className={styles.books}>
      {booksList.map((book) => {
        return (
          <div key={book.id} className={styles.book}>
            <h2><Link to={`/books-animations/based-on/${book.id}`}>{book.title}</Link></h2>
            <img src={`/images/books-animations/${book.image}`} />
            {book.links?.map(link => (
              <div key={link}>
                <a href={link}>{link}</a>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Books;
