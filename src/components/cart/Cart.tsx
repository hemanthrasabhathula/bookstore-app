import {
  Breadcrumb,
  Button,
  Container,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import { useBooks } from "../bookcontext/BookContext";
import { Link } from "react-router-dom";
import { BookAndBranches, Branch } from "../../model/Definitions";
import { ReactComponent as Editicon } from "../../pencil.svg";
import { useEffect, useRef, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const { bookslist, updateBooklist, clearBooklist } = useBooks();

  console.log("BooksList", bookslist);

  return (
    <>
      <Container style={{ paddingTop: "20px", paddingBottom: "100px" }}>
        <Breadcrumb>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="justify-content-evenly">
          <Col lg="10" md="10" xs="auto" sm="auto">
            {bookslist.length === 0 ? ( // If no books are found, display a message to the user
              <Row>
                <h2>No Books in the Cart</h2>
              </Row>
            ) : (
              <>
                <Row>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        {/* <th>#</th> */}
                        <th>Book</th>
                        <th>Branches</th>
                        <th>Copies</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookslist.map((book, bookIndex) => (
                        <>
                          {book.branches?.map((branch, branchIndex) => (
                            <CartTable
                              book={book}
                              bookIndex={bookIndex}
                              branch={branch}
                              branchIndex={branchIndex}
                            />
                          ))}
                        </>
                      ))}
                    </tbody>
                  </Table>
                </Row>
                <Row className="justify-content-md-end">
                  <Col lg="auto" md="auto" xs="auto" sm="auto">
                    <Button>Buy</Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        clearBooklist();
                      }}
                    >
                      Clear Cart
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

const CartTable = ({
  book,
  bookIndex,
  branch,
  branchIndex,
}: {
  book: BookAndBranches;
  bookIndex: number;
  branch: Branch;
  branchIndex: number;
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const { bookslist, updateBooklist } = useBooks();
  const [bookCount, setBookCount] = useState<number>(branch.count || 0);
  const handleTableActions = (bookId: string, branchId: string) => {
    console.log("Remove", bookId, branchId);
    bookslist.forEach((book) => {
      if (book._id.$oid === bookId) {
        book.branches = book.branches?.filter(
          (branch) => branch._id.$oid !== branchId
        );

        updateBooklist(book);
      }
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("useEffect", bookCount, readOnly);
    if (!readOnly && inputRef.current) {
      inputRef.current.focus();
    }
  }, [readOnly]);

  const handleBlur = (
    bookId: string,
    branchId: string,
    copyCount: number | undefined,
    branchCount: number
  ) => {
    // setReadOnly(false);
    console.log("Edit", bookId, branchId, copyCount, branchCount);
    // setBookCount(copyCount || branchCount);
    // if (copyCount === undefined || isNaN(copyCount) || copyCount < 0) {
    //   console.log("Invalid count:: ", copyCount);
    //   setBookCount(branchCount);
    // } else {
    bookslist.forEach((book) => {
      if (book._id.$oid === bookId) {
        book.branches?.forEach((branch) => {
          if (branch._id.$oid === branchId.toString()) {
            if (copyCount === undefined || isNaN(copyCount) || copyCount < 0) {
              console.log("Invalid count:: ", copyCount);
              setBookCount(branchCount);
            } else {
              branch.count = copyCount;
            }
            console.log("Branch --> ", branch);
            updateBooklist(book);
          }
        });

        console.log("Book --> ", book);
      }
    });
    //}
  };

  return (
    <>
      <tr key={`${bookIndex}-${branchIndex}`}>
        {branchIndex === 0 && (
          <>
            {/* <td
              rowSpan={book.branches?.length}
              style={{ verticalAlign: "middle" }}
            >
              {book._id.$oid}
            </td> */}
            <td
              rowSpan={book.branches?.length}
              style={{ verticalAlign: "middle" }}
            >
              <b>{book.title}</b>
              {` by ${book.author}`}
            </td>
          </>
        )}
        <td>{`${branch.name}  -  ${branch.state}`}</td>
        <td>
          <input
            type="number"
            ref={inputRef}
            readOnly={readOnly}
            style={{ border: "none", backgroundColor: "transparent" }}
            key={branch._id.$oid}
            className="quantity-input"
            defaultValue={bookCount}
            onBlur={(e) => {
              setReadOnly(true);
              console.log("onBlur", e.target.value);
              if (e.target.value === "" || isNaN(parseInt(e.target.value))) {
                e.target.value = branch.count?.toString() || "0";
              } else {
                handleBlur(
                  book._id.$oid,
                  branch._id.$oid,
                  parseInt(e.target.value),
                  branch.count || 0
                );
              }
            }}
          />
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              console.log("readonly ", !readOnly);
              setReadOnly(!readOnly);
            }}
          >
            <Editicon style={{ width: "18px", height: "18px" }} />
          </button>
        </td>
        <td>
          <Button
            onClick={() => handleTableActions(book._id.$oid, branch._id.$oid)}
          >
            Remove
          </Button>
        </td>
      </tr>
    </>
  );
};

export default Cart;
