import { useLocation } from "react-router-dom";
import { Book } from "../model/Definitions";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./BookItem.css";
import { branchesList } from "../data/Branches_dummy";

const BookItem = () => {
  const location = useLocation();
  const book: Book = location.state?.book;
  return (
    <Container
      className="book-list-container"
      fluid="md"
      style={{ paddingTop: "100px" }}
    >
      <Row className="justify-content-center">
        <Col sm={1} md={2} lg={4}></Col>
        <Col
          sm={5}
          md={4}
          lg={2}
          onClick={() => (window.location.href = book.image)}
        >
          <Image
            rounded
            style={{
              width: "200px",
              aspectRatio: "2/3",
              objectFit: "cover",
            }}
            src={book.image}
            alt={book.title}
          />
        </Col>
        <Col className="justify-content-center book-text " sm={6} md={6} lg={6}>
          <div className="book-details-container">
            <Row>
              <div className="book-title">{book.title}</div>
              <div>{`Author: ${book.author}`}</div>
              <div>{`ISBN: ${book.ISBN}`}</div>
              <div>{`Genre: ${book.genre}`}</div>
              <div>{`Published: ${book.published}`}</div>
              <div>{`Pages: ${book.pages}`}</div>
            </Row>
            <Row>
              <div>Available at:</div>
              <span>
                {branchesList.map((branch) => (
                  <li key={branch.id}>{branch.name}</li>
                ))}
              </span>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookItem;
