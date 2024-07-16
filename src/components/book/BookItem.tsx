import { Link, useLocation } from "react-router-dom";
import { Book, BookAndBranches, Branch } from "../../model/Definitions";
import { Breadcrumb, Col, Container, Fade, Image, Row } from "react-bootstrap";
import "./BookItem.css";
import { branchesList } from "../../data/Branches_dummy";
import { useEffect, useState } from "react";
import BranchItem from "../branch/BranchItem";
import { useBooks } from "../bookcontext/BookContext";
import { useBookStoreContext } from "../bookcontext/BookStoreContext";
import { count } from "console";
import BreadcrumbComp from "../common/BreadcrumbComp";

const BookItem = () => {
  const location = useLocation();
  const [book, setBook] = useState<Book>(location.state?.book);
  // const [totalCount, setTotalCount] = useState(0);

  //const { bookslist, branches, updateBooklist } = useBooks();
  const { branches, cartItems, addToCart } = useBookStoreContext();

  const bookFound = cartItems.find(
    (item) => item.book._id.$oid === book._id.$oid
  );

  const branchCopies: Branch[] = branches.map((branch) => {
    const defBranch = { ...branch, count: 0 };
    if (bookFound) {
      const branchFound = bookFound.branches.find(
        (b) => b._id.$oid === branch._id.$oid
      );
      if (branchFound) {
        return branchFound;
      } else {
        return defBranch;
      }
    } else {
      return defBranch;
    }
  });

  // const bookIndex = bookslist.findIndex((b) => b._id.$oid === book._id.$oid);
  // const [branchCopies, setBranchCopies] = useState<Branch[]>(
  //   bookIndex >= 0 ? bookslist[bookIndex].branches : []
  // );
  // const branchesCombined: Branch[] = [];
  // if (bookIndex >= 0) {
  //   console.log("found book in bookslist");
  //   branchesCombined.push(...bookslist[bookIndex].branches);
  // }

  // branches.forEach((branchFromList) => {
  //   // Check if the branch is not already in branchesCombined
  //   const isBranchAlreadyIncluded = branchesCombined.some(
  //     (combinedBranch) => combinedBranch._id.$oid === branchFromList._id.$oid
  //   );

  //   // If the branch is not in branchesCombined, push it to branchesCombined
  //   if (!isBranchAlreadyIncluded) {
  //     branchesCombined.push(branchFromList);
  //   }
  // });
  // branchesCombined.sort((a, b) => a._id.$oid.localeCompare(b._id.$oid));

  const handleCartItem = (num: number, branch: Branch) => {
    // if (branchCopies.length === 0) {
    //   branchCopies.push(branch);
    // } else {
    //   const index = branchCopies.findIndex(
    //     (b) => b._id.$oid === branch._id.$oid
    //   );
    //   if (index !== -1) {
    //     // If branch is found, replace the old branch with the new one
    //     if (branch.count === 0) {
    //       branchCopies.splice(index, 1);
    //     } else {
    //       branchCopies.splice(index, 1, branch);
    //     }
    //   } else {
    //     // If branch is not found, push the new branch into branchCopies
    //     branchCopies.push(branch);
    //   }
    // }

    // setBranchCopies(branchCopies);

    // const updatedBook: BookAndBranches = { ...book, branches: branchCopies };
    // setBook(updatedBook);
    // updateBooklist(updatedBook);

    // const totalCountNum = totalCount + num;
    // setTotalCount(totalCountNum);
    addToCart(book, branch);
  };

  return (
    <>
      <Fade appear in={true}>
        <Container style={{ paddingTop: "20px", paddingBottom: "100px" }}>
          <BreadcrumbComp active={"Book"} />
          <Row
            id="image"
            className="justify-content-evenly"
            style={{ paddingTop: "20px" }}
          >
            <Col
              lg={{ span: 2, offset: 2 }}
              md="4"
              xs="auto"
              sm="auto"
              className="justify-content-end"
              style={{ alignContent: "center" }}
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
              lg="6"
              md="6"
              xs="auto"
              sm="auto"
              className="justify-content-evenly"
            >
              <div className="book-details-container">
                <Row>
                  <div>
                    <b>{book.title}</b>
                  </div>
                  <div>{`Author: ${book.author}`}</div>
                  <div>{`ISBN: ${book.ISBN}`}</div>
                  <div>{`Genre: ${book.genre}`}</div>
                  <div>{`Published: ${book.published}`}</div>
                  <div>{`Pages: ${book.pages}`}</div>
                </Row>
                <Row className="mt-4">
                  <div>Available at:</div>

                  {branchCopies.map((branch) => (
                    <BranchItem
                      key={branch._id.$oid}
                      branch={branch}
                      onCountChange={handleCartItem}
                    />
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Fade>
    </>
  );
};

export default BookItem;
