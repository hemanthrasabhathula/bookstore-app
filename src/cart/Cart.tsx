import { Breadcrumb, Button, Table } from "react-bootstrap";
import { useBooks } from "../bookcontext/BookContext";
import { Book } from "../model/Definitions";
import { Link } from "react-router-dom";

const Cart = () => {
  const { bookslist } = useBooks();

  console.log("BooksList", bookslist);

  const data = [
    {
      parent: "Parent 1",
      children: [
        { col2: "Child 1.1", col3: "Child 1.1.1" },
        { col2: "Child 1.2", col3: "Child 1.2.1" },
        { col2: "Child 1.3", col3: "Child 1.3.1" },
      ],
    },
    {
      parent: "Parent 2",
      children: [
        { col2: "Child 2.1", col3: "Child 2.1.1" },
        { col2: "Child 2.2", col3: "Child 2.2.1" },
        { col2: "Child 2.3", col3: "Child 2.3.1" },
      ],
    },
  ];
  return (
    // <>
    //   <Breadcrumb>
    //     <Breadcrumb.Item>
    //       <Link to={"/"}>Home</Link>
    //     </Breadcrumb.Item>

    //     <Breadcrumb.Item active>Cart</Breadcrumb.Item>
    //   </Breadcrumb>
    //   <h1>Cart</h1>

    //   <Table bordered hover>
    //     <thead>
    //       <tr>
    //         <th>#</th>
    //         <th>Book</th>
    //         <th>Branches</th>
    //         <th>Copy</th>
    //         <th>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>1</td>
    //         <td>The Alchemist by pauelo</td>
    //         <td>
    //           <Table hover>
    //             <tbody>
    //               <tr>
    //                 <td id="branch1">Nested Branch 1</td>
    //               </tr>
    //               <tr>
    //                 <td id="branch2">Nested Branch 2</td>
    //               </tr>
    //             </tbody>
    //           </Table>
    //         </td>

    //         <td>
    //           <Table hover>
    //             <tbody>
    //               <tr>
    //                 <td id="copy1">1</td>
    //               </tr>
    //               <tr>
    //                 <td id="copy2">2</td>
    //               </tr>
    //             </tbody>
    //           </Table>
    //         </td>
    //         <td>
    //           <Table>
    //             <tbody>
    //               <tr>
    //                 <td>
    //                   <Button style={{ padding: "0px" }}>Buy</Button>{" "}
    //                   <Button style={{ padding: "0px" }}>Remove</Button>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <td>
    //                   <Button style={{ padding: "0px" }}>Buy</Button>{" "}
    //                   <Button style={{ padding: "0px" }}>Remove</Button>
    //                 </td>
    //               </tr>
    //             </tbody>
    //           </Table>
    //         </td>
    //       </tr>
    //       <tr>
    //         <td>2</td>
    //         <td>Jacob</td>
    //         <td>Thornton</td>
    //         <td>@fat</td>
    //       </tr>
    //       <tr>
    //         <td>3</td>
    //         <td colSpan={2}>Larry the Bird</td>
    //         <td>@twitter</td>
    //       </tr>
    //     </tbody>
    //   </Table>
    // </>

    <>
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

        {/* <tbody>
          {data.map((row, rowIndex) => (
            <>
              {row.children.map((child, childIndex) => (
                <tr key={`${rowIndex}-${childIndex}`}>
                  {childIndex === 0 && (
                    <td rowSpan={row.children.length}>{row.parent}</td>
                  )}
                  <td>{child.col2}</td>
                  <td>{child.col3}</td>
                  <td>
                    <Button>Buy</Button> <Button>Remove</Button>
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody> */}
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
        {/* <tbody>
          <tr>
            <td rowSpan={2} style={{ verticalAlign: "middle" }}>
              1
            </td>
            <td rowSpan={2} style={{ verticalAlign: "middle" }}>
              Alchemist by Meroia
            </td>
            <td>Branch1</td>
            <td>4</td>
            <td>
              <Button>Remove</Button>
            </td>
          </tr>
          <tr>
            <td>Branch2</td>
            <td>3</td>
            <td>
              <Button>Remove</Button>
            </td>
          </tr>

          <tr>
            <td rowSpan={2} style={{ verticalAlign: "middle" }}>
              2
            </td>
            <td rowSpan={2} style={{ verticalAlign: "middle" }}>
              The Hobbit by Paulo
            </td>
            <td>Branch3</td>
            <td>4</td>
            <td>
              <Button>Remove</Button>
            </td>
          </tr>
          <tr>
            <td>Branch2</td>
            <td>3</td>
            <td>
              <Button>Remove</Button>
            </td>
          </tr>
        </tbody> */}
      </Table>
      {/* <Table>
        <thead>
          <tr>
            <th>Parent</th>
            <th>Col 2</th>
            <th>Col 3</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <>
              {row.children.map((child, childIndex) => (
                <tr key={`${rowIndex}-${childIndex}`}>
                  {childIndex === 0 && (
                    <td rowSpan={row.children.length}>{row.parent}</td>
                  )}
                  <td>{child.col2}</td>
                  <td>{child.col3}</td>
                  <td>
                    <Button>Buy</Button> <Button>Remove</Button>
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </Table> */}
    </>
  );
};

export default Cart;
