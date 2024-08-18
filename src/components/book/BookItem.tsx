import { Link, useLocation, useParams } from "react-router-dom";
import { Book, BookAndBranches, Branch } from "../../model/Definitions";
import {
  Breadcrumb,
  Col,
  Container,
  Fade,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import "./BookItem.css";
import { branchesList } from "../../data/Branches_dummy";
import { useEffect, useState } from "react";
import BranchItem from "../branch/BranchItem";
import { useBooks } from "../bookcontext/BookContext";
import { useBookStoreContext } from "../bookcontext/BookStoreContext";
import { count } from "console";
import BreadcrumbComp from "../common/BreadcrumbComp";
import BookLines from "../booklines/BookLines";
import Fireflies from "../common/Fireflies";
import { colors } from "../../model/Constants";
import { fetchBookDataById } from "../../utils/BookService";
import ToastItem from "../common/ToastItem";

const BookItem = () => {
  const location = useLocation();
  // fetch bookId from location path
  const { branches, cartItems, addToCart } = useBookStoreContext();
  const { bookId } = useParams<{ bookId: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastObject, setToastObject] = useState({
    heading: "",
    message: "",
    variant: "", // e.g., 'success', 'error', etc.
  });
  const [showToast, setShowToast] = useState(false);
  const toggleShowtoast = () => setShowToast(!showToast);
  const fetchBookData = (bookid: string) => {
    fetchBookDataById(bookid)
      .then((response) => {
        if (response.status != 200 || !response.data) {
          setError("Error fetching Book Data");
          setLoading(false);
          setToastObject({
            heading: "Error",
            message: response.message,
            variant: "danger",
          });
          setShowToast(true);
          throw Error("Error fetching Book");
        }
        const book_data = response.data as Book;
        setError(null);
        setLoading(false);
        setBook(book_data);
      })
      .catch((error: Error) => {
        setError("Error fetching Book Data");
        setLoading(false);
        setToastObject({
          heading: "Error",
          message: error.message,
          variant: "danger",
        });
        setShowToast(true);
        console.log("Error fetching Book", error);
      });
  };
  // if ((!location.state || !location.state.book) && bookId) {
  //   fetchBookData(bookId);
  // }

  const [book, setBook] = useState<Book | null>(location.state?.book || null);

  // const [totalCount, setTotalCount] = useState(0);

  //const { bookslist, branches, updateBooklist } = useBooks();
  const generateRandomGradient = () => {
    const halfLength = Math.floor(colors.length / 2);
    const color1 = colors[Math.floor(Math.random() * halfLength)];
    let color2;
    do {
      color2 = colors[Math.floor(Math.random() * halfLength) + halfLength];
    } while (color2 === color1);
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  };

  const [gradient, setGradient] = useState(generateRandomGradient());

  const changeGradient = () => {
    setGradient(generateRandomGradient());
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (bookId && (!location.state || !location.state.book))
      fetchBookData(bookId);

    if (book) {
      setError(null);
      setLoading(false);
    }
  }, [bookId, location.state?.book]);

  // if (!book) {
  //   return <div>Loading...</div>;
  // }

  const bookFound = cartItems.find(
    (item) => item.book._id.$oid === book?._id.$oid
  );
  //const [bookId, setBookId] = useState<string>(book._id.$oid);

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

  // const handleCartItem = (num: number, branch: Branch) => {
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
  //   addToCart(book, branch);
  // };

  return (
    <>
      <Fade appear in={true}>
        {book && !loading && error == null ? (
          <div style={{ background: gradient }}>
            <Container
              className="container-height"
              // style={{
              //   paddingTop: "20px",
              //   paddingBottom: "20px",
              // }}
            >
              <BreadcrumbComp active={"Book"} />
              <Row id="image" className="justify-content-center">
                <Col
                  lg="auto"
                  md="auto"
                  xs="auto"
                  sm="auto"
                  style={{ alignContent: "center", paddingTop: "40px" }}
                  onClick={() => (window.location.href = book.image)}
                >
                  <Image
                    rounded
                    style={{
                      width: "200px",
                      aspectRatio: "2/3",
                      objectFit: "cover",
                      boxShadow: "0 7px 30px rgba(0, 0, 0, 0.3)",
                    }}
                    src={book.image}
                    alt={book.title}
                  />
                </Col>
                <Col
                  id="details"
                  lg="auto"
                  md="auto"
                  xs="auto"
                  sm="auto"
                  // className="justify-content-center"
                  style={{
                    alignContent: "center",
                  }}
                >
                  {/* <div>
                  <Row> */}
                  <div className="book-details-container">
                    <div>
                      <b>{book.title}</b>
                    </div>
                    <div>{`Author: ${book.author}`}</div>
                    <div>{`ISBN: ${book.ISBN}`}</div>
                    <div>{`Genre: ${book.genre}`}</div>
                    <div>{`Published: ${book.published}`}</div>
                    <div>{`Pages: ${book.pages}`}</div>
                    {/* </Row> */}
                    {/* <Row className="mt-4">
                    <div>Available at:</div>

                    {branchCopies.map((branch) => (
                      <BranchItem
                        key={branch._id.$oid}
                        branch={branch}
                        onCountChange={handleCartItem}
                      />
                    ))}
                  </Row> */}
                    {/* </div> */}
                  </div>
                </Col>
              </Row>
              <Row
                className="justify-content-center mt-3"
                style={{ padding: "30px" }}
              >
                <Col lg="8">
                  <div>
                    <b>Description:</b> This book tells the story of two dads,
                    one rich and one poor, and how they teach their sons
                    different and opposing financial philosophies. It explores
                    how traditional education does not cover financial literacy,
                    and how most people live paycheque to paycheque without ever
                    achieving financial freedom. The book encourages readers to
                    think differently about money and teaches financial
                    independence. The rich dad's philosophy emphasizes the
                    importance of having multiple streams of income, building
                    assets, and working to make money work for you, rather than
                    working for money. The poor dad's philosophy prioritizes
                    saving and being thrifty. The book is written in an
                    easy-to-understand style, making it accessible to a wide
                    range of readers.
                  </div>
                </Col>
              </Row>
            </Container>

            <BookLines bookId={bookId}></BookLines>
            {/* <Fireflies>
            <BookLines></BookLines>
          </Fireflies> */}
          </div>
        ) : (
          <div>
            <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
              <BreadcrumbComp active={"Book"} />
              <Row>
                {loading ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                      <h2 style={{ marginLeft: "10px" }}>Loading...</h2>
                    </div>
                  </>
                ) : (
                  error != null && <h2>{error}</h2>
                )}
              </Row>
            </Container>
          </div>
        )}
      </Fade>
      <ToastItem
        showToast={showToast}
        {...toastObject}
        toggleToast={toggleShowtoast}
      />
    </>
  );
};

export default BookItem;
