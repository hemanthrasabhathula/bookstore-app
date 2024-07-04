import { Link, useLocation } from "react-router-dom";
import { BookAndBranches, Branch } from "../../model/Definitions";
import { Breadcrumb, Col, Container, Image, Row } from "react-bootstrap";
import "./BookItem.css";
import { branchesList } from "../../data/Branches_dummy";
import { useEffect, useState } from "react";
import BranchItem from "../branch/BranchItem";
import { useBooks } from "../bookcontext/BookContext";

const BookItem = () => {
  const location = useLocation();
  const [book, setBook] = useState(location.state?.book);
  const [totalCount, setTotalCount] = useState(0);
  const [branchCopies, setBranchCopies] = useState<Branch[]>([]);

  const { updateBooklist } = useBooks();

  const handletotalCount = (num: number, branch: Branch) => {
    if (branchCopies.length === 0) {
      branchCopies.push(branch);
    } else {
      const index = branchCopies.findIndex((b) => b.id === branch.id);
      if (index !== -1) {
        // If branch is found, replace the old branch with the new one
        if (branch.count === 0) {
          branchCopies.splice(index, 1);
        } else {
          branchCopies.splice(index, 1, branch);
        }
      } else {
        // If branch is not found, push the new branch into branchCopies
        branchCopies.push(branch);
      }
    }

    setBranchCopies(branchCopies);

    const updatedBook: BookAndBranches = { ...book, branches: branchCopies };
    setBook(updatedBook);
    updateBooklist(updatedBook);

    const totalCountNum = totalCount + num;
    setTotalCount(totalCountNum);
  };

  useEffect(() => {
    console.log("book ", book);
    console.log("totalCount ", totalCount);
  }, [totalCount]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/"}>Home</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item active>Book</Breadcrumb.Item>
      </Breadcrumb>
      <Container
        className="book-list-container"
        fluid="md"
        style={{ paddingTop: "100px" }}
      >
        <Row id="image" className="justify-content-center">
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
          <Col
            id="details"
            className="justify-content-center book-text "
            sm={6}
            md={6}
            lg={6}
          >
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
                      key={branch.id}
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
    </>
  );
};

export default BookItem;
