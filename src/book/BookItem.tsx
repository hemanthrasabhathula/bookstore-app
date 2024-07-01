import { useLocation } from "react-router-dom";
import { Book } from "../model/Definitions";
import { Image } from "react-bootstrap";

const BookItem = () => {
  const location = useLocation();
  const book: Book = location.state?.book;
  return (
    <div>
      <div className="book-item">
        <div className="book-image">
          <Image
            rounded
            style={{
              width: "20%",
              height: "auto",
              aspectRatio: "2/3",
              objectFit: "cover",
            }}
            src={book.image}
            alt={book.title}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <span>{book.author}</span>
        <span>{book.ISBN}</span>
        <span>{book.genre}</span>
        <span>{book.published}</span>
        <span>{book.pages}</span>
      </div>
    </div>
  );
};

export default BookItem;
