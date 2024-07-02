import { useLocation } from "react-router-dom";
import { Book, Branch } from "../model/Definitions";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import "./BookItem.css";
import { branchesList } from "../data/Branches_dummy";
import { useEffect, useState } from "react";
import BranchItem from "../branch/BranchItem";

const BookItem = () => {
  const location = useLocation();
  const [book, setBook] = useState(location.state?.book);
  const [totalCount, setTotalCount] = useState(0);

  const branchCopies: Branch[] = branchesList;

  const handletotalCount = (num: number, branch: Branch) => {
    branchCopies.map((b) => {
      if (b.id === branch.id) {
        if (b.count === undefined) {
          b.count = 0;
        }
        b.count = branch.count;
      }
    });
    console.log(branchCopies);

    console.log(`For ${branch.name} added ${num} of books. `);
    const totalCountNum = totalCount + num;
    setTotalCount(totalCountNum);
  };

  useEffect(() => {
    console.log(`Updated total count ${totalCount} of books.`);
    if (book) {
      // Assuming book is an object and can have a branches property
      const updatedBook = { ...book, branches: branchCopies };
      setBook(updatedBook);
    }
    console.log(book);
  }, [totalCount]);

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
                  <BranchItem
                    branch={branch}
                    onCountChange={handletotalCount}
                  />
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
