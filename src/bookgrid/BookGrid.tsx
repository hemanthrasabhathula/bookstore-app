import { Row, Col, Image } from "react-bootstrap";
import { Book } from "../model/Definitions";
import "./BookGrid.css";
import { useNavigate } from "react-router-dom";

const BookList = ({ booklist }: { booklist: Book[] }) => {
  const navigate = useNavigate();

  return (
    <>
      <Row>
        <h2 className="mb-3">All Books</h2>
        {booklist.map((book) => (
          <Col xs={4} sm={4} md={3} lg={2} key={book.id} className="mb-4">
            <div className="book-item">
              <div
                className="book-image"
                onClick={() =>
                  navigate(`/book/${book.id}`, { state: { book } })
                }
              >
                <Image
                  rounded
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "2/3",
                    objectFit: "cover",
                  }} // Set width to 100%, height to auto, and aspectRatio to maintain a 2:3 ratio for all images
                  src={book.image}
                  alt={book.title}
                />
              </div>
              <div className="book-title">{book.title}</div>
              {/* Uncomment to display additional book details */}
              {/* <span>{book.author}</span>
              <span>{book.ISBN}</span>
              <span>{book.genre}</span>
              <span>{book.published}</span>
              <span>{book.pages}</span> */}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BookList;
