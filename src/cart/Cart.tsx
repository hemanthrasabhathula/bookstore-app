import { Breadcrumb, Button, Table } from "react-bootstrap";
import { useBooks } from "../bookcontext/BookContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { bookslist } = useBooks();

  console.log("BooksList", bookslist);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/"}>Home</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item active>Cart</Breadcrumb.Item>
      </Breadcrumb>
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
                    <Button>Remove</Button>
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Cart;
