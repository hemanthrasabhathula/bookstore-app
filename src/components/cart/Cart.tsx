import { Breadcrumb, Button, Table } from "react-bootstrap";
import { useBooks } from "../bookcontext/BookContext";
import { Link } from "react-router-dom";
import { BookAndBranches, Branch } from "../../model/Definitions";

const Cart = () => {
  const { bookslist, updateBooklist } = useBooks();

  console.log("BooksList", bookslist);

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <Breadcrumb.Item active>Cart</Breadcrumb.Item>
      </Breadcrumb>

      {bookslist.length === 0 ? ( // If no books are found, display a message to the user
        <h2>No Books in the Cart</h2>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
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
      )}
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
  const { bookslist, updateBooklist } = useBooks();

  const handleTableActions = (bookId: number, branchId: number) => {
    console.log("Remove", bookId, branchId);
    bookslist.forEach((book) => {
      if (book.id === bookId) {
        book.branches = book.branches?.filter(
          (branch) => branch.id !== branchId
        );
        updateBooklist(book);
      }
    });
  };
  return (
    <>
      <tr key={`${bookIndex}-${branchIndex}`}>
        {branchIndex === 0 && (
          <>
            <td
              rowSpan={book.branches?.length}
              style={{ verticalAlign: "middle" }}
            >
              {book.id}
            </td>
            <td
              rowSpan={book.branches?.length}
              style={{ verticalAlign: "middle" }}
            >
              {`${book.title} by ${book.author}`}{" "}
            </td>
          </>
        )}
        <td>{`${branch.name}  -  ${branch.state}`}</td>
        <td>{branch.count}</td>
        <td>
          <Button onClick={() => handleTableActions(book.id, branch.id)}>
            Remove
          </Button>
        </td>
      </tr>
    </>
  );
};

export default Cart;
