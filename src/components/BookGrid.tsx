import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Book } from "../model/Definitions";
import "./BookGrid.css";

const BookList = ({ booklist }: { booklist: Book[] }) => {
  return (
    <>
      <h2>Book List</h2>
      <Row>
        {booklist.map((book) => (
          <Col xs={6} sm={6} md={3} lg={2} key={book.id} className="mb-4">
            <div className="book-item">
              <div
                className="book-image"
                onClick={() => (window.location.href = book.image)}
              >
                <Image
                  rounded
                  style={{ width: "100%", height: "auto" }}
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
