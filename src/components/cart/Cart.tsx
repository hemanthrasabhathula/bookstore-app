import {
  Breadcrumb,
  Button,
  Container,
  Table,
  Row,
  Col,
  Fade,
} from "react-bootstrap";
import { useBooks } from "../bookcontext/BookContext";
import { Link } from "react-router-dom";
import {
  Book,
  BookAndBranches,
  Branch,
  CartItem,
} from "../../model/Definitions";
import { ReactComponent as Editicon } from "../../pencil.svg";
import { useEffect, useRef, useState } from "react";
import "./Cart.css";
import { useBookStoreContext } from "../bookcontext/BookStoreContext";
import ConfirmationModal from "../common/ConfirmationModal";
import ToastItem from "../common/ToastItem";
import { maketransaction } from "../../utils/CartService";
import BreadcrumbComp from "../common/BreadcrumbComp";

const Cart = () => {
  //const { bookslist, updateBooklist, clearBooklist } = useBooks();

  const { cartItems, clearCart, addToCart } = useBookStoreContext();
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastObject, setToastObject] = useState({
    heading: "",
    message: "",
    variant: "", // e.g., 'success', 'error', etc.
  });

  const toggleShowtoast = () => setShowToast(!showToast);

  console.log("CartItems ", cartItems);

  const handleOnConfirm = () => {
    setShowModal(false);
    console.log("Purchase Items:: ", cartItems);
    maketransaction(cartItems)
      .then((response) => {
        console.log("Transaction Response", response);
        clearCart();

        setToastObject({
          heading: "Success",
          message: response,
          variant: "success",
        });

        toggleShowtoast();
      })
      .catch((error) => {
        console.error("Error purchasing books", error);
        setToastObject({
          heading: "Error",
          message: error.message,
          variant: "danger",
        });
        toggleShowtoast();
      });
  };

  const handleOnClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <Fade appear in={true}>
        <Container style={{ paddingTop: "20px", paddingBottom: "100px" }}>
          <BreadcrumbComp active={"Cart"} />
          <Row className="justify-content-evenly">
            <Col lg="10" md="10" xs="auto" sm="auto">
              {cartItems.length === 0 ? ( // If no books are found, display a message to the user
                <Row>
                  <h2>No Books in the Cart</h2>
                </Row>
              ) : (
                <>
                  <Row>
                    <h3 className="mb-4">Cart Items </h3>
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
                        {cartItems.map((cartItem, cartIndex) =>
                          cartItem.branches?.map((branch, branchIndex) => (
                            <CartTable
                              key={`${cartIndex}-${branchIndex}`}
                              cartItems={cartItems}
                              cartItem={cartItem}
                              cartIndex={cartIndex}
                              branch={branch}
                              branchIndex={branchIndex}
                              addToCart={addToCart}
                            />
                          ))
                        )}
                      </tbody>
                    </Table>
                  </Row>
                  <Row className="justify-content-md-end">
                    <Col lg="auto" md="auto" xs="auto" sm="auto">
                      <Button
                        onClick={() => {
                          setShowModal(true);
                        }}
                      >
                        Buy
                      </Button>
                      <Button
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          clearCart();
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
      </Fade>
      <ConfirmationModal
        isOpen={showModal}
        title="Confirm to Buy"
        message="Click on Confirm to buy the Books"
        onConfirm={handleOnConfirm}
        onClose={handleOnClose}
        confirmText="Confirm"
      />
      <ToastItem
        showToast={showToast}
        {...toastObject}
        toggleToast={toggleShowtoast}
      />
    </>
  );
};

const CartTable = ({
  cartItems,
  cartItem,
  cartIndex,
  branch,
  branchIndex,
  addToCart,
}: {
  cartItems: CartItem[];
  cartItem: CartItem;
  cartIndex: number;
  branch: Branch;
  branchIndex: number;
  addToCart: (book: Book, branch: Branch) => void;
}) => {
  const [readOnly, setReadOnly] = useState(true);
  //const { bookslist, updateBooklist } = useBooks();
  const [bookCount, setBookCount] = useState<number>(branch.count || 0);
  // const handleTableActions = (bookId: string, branchId: string) => {
  //   console.log("Remove", bookId, branchId);
  //   cartItems.forEach((cartItem) => {
  //     if (cartItem.book._id.$oid === bookId) {
  //       cartItem.branches = cartItem.branches?.filter(
  //         (branch) => branch._id.$oid !== branchId
  //       );

  //       addToCart(book);
  //     }
  //   });
  // };

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
    cartItems.forEach((cartItem) => {
      if (cartItem.book._id.$oid === bookId) {
        cartItem.branches?.forEach((branch) => {
          if (branch._id.$oid === branchId.toString()) {
            if (copyCount === undefined || isNaN(copyCount) || copyCount < 0) {
              console.log("Invalid count:: ", copyCount);
              setBookCount(branchCount);
            } else {
              branch.count = copyCount;
            }
            console.log("Branch --> ", branch);
            addToCart(cartItem.book, branch);
          }
        });
      }
    });
    //}
  };

  return (
    <>
      <tr key={`${cartIndex}-${branchIndex}`}>
        {branchIndex === 0 && (
          <>
            {/* <td
              rowSpan={book.branches?.length}
              style={{ verticalAlign: "middle" }}
            >
              {book._id.$oid}
            </td> */}
            <td
              rowSpan={cartItem.branches?.length}
              style={{ verticalAlign: "middle" }}
            >
              <b>{cartItem.book.title}</b>
              {` by ${cartItem.book.author}`}
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
            value={bookCount}
            onChange={(e) => {
              console.log("onChange", e.target.value);
              setBookCount(parseInt(e.target.value));
            }}
            onBlur={(e) => {
              setReadOnly(true);
              console.log("onBlur", e.target.value);
              if (e.target.value === "" || isNaN(parseInt(e.target.value))) {
                e.target.value = bookCount.toString() || "0";
              } else {
                handleBlur(
                  cartItem.book._id.$oid,
                  branch._id.$oid,
                  parseInt(e.target.value),
                  branch.count || 0
                );
              }
            }}
          />
          <button
            key={`${cartIndex}-${branchIndex}`}
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
            key={`${cartIndex}-${branchIndex}`}
            onClick={() => addToCart(cartItem.book, { ...branch, count: 0 })}
          >
            Remove
          </Button>
        </td>
      </tr>
    </>
  );
};

export default Cart;
