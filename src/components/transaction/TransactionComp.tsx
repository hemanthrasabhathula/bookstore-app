import { useEffect, useState } from "react";
import { Transaction } from "../../model/Definitions";
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import BreadcrumbComp from "../common/BreadcrumbComp";
import {
  fetchTransactions,
  returnCopyTransaction,
} from "../../utils/TransactionService";
import ToastItem from "../common/ToastItem";

const TransactionComp = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState<{ [key: string]: boolean }>({});
  const [showToast, setShowToast] = useState(false);
  const [toastObject, setToastObject] = useState({
    heading: "",
    message: "",
    variant: "", // e.g., 'success', 'error', etc.
  });

  const toggleShowtoast = () => setShowToast(!showToast);

  const callFetchTransactions = async () => {
    fetchTransactions()
      .then((response) => {
        if (response.length === 0) {
          setError("No transactions found");
          setTransactions(response);
          setLoading(false);
        } else {
          setTransactions(response);
          setError(null);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions", error);
        setError("Error fetching transactions");
        setLoading(false);
      });
  };
  useEffect(() => {
    callFetchTransactions();
  }, []);

  const handleReturn = (copy_id: string, index: number) => {
    const copy_uid = `${copy_id}-${index}`;
    setLoadingBtn((prev) => ({ ...prev, [copy_uid]: true }));
    console.log("Returning Copy", copy_id);
    returnCopyTransaction(copy_id)
      .then((response) => {
        console.log("Copy Returned", response);
        setToastObject({
          heading: "Success",
          message: response,
          variant: "success",
        });
        toggleShowtoast();
        callFetchTransactions();
      })
      .catch((error) => {
        setToastObject({
          heading: "Error",
          message: error.message,
          variant: "danger",
        });
        toggleShowtoast();
        console.error("Error returning copy", error);
      })
      .finally(() => {
        setLoadingBtn((prev) => ({ ...prev, [copy_uid]: false }));
      });
  };

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);
  return (
    <>
      <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <BreadcrumbComp active={"Transactions"} />
        <Row className="justify-content-evenly">
          <Col lg="auto" md="auto" xs="auto" sm="auto">
            {loading ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h2 style={{ marginLeft: "10px" }}>Loading...</h2>
              </div>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              <>
                <h3 className="mb-4">Transactions </h3>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Copy</th>
                      <th>Book</th>
                      <th>Branch</th>
                      <th>Status</th>
                      <th>Borrowed Date</th>
                      <th>Due Date</th>
                      <th>Returned Date</th>
                      <th>Late Fee</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={`${transaction._id.$oid}-${index}`}>
                        <td>{index + 1}</td>
                        <td>{transaction.copyId.$oid}</td>
                        <td>{transaction.bookName}</td>
                        <td>{transaction.branchName}</td>
                        <td>{transaction.status}</td>
                        <td>{getDate(transaction.borrowedDate.$date)}</td>
                        <td>{getDate(transaction.dueDate.$date)}</td>
                        <td style={{ textAlign: "center" }}>{`${
                          transaction.returnDate === null ||
                          transaction.returnDate === undefined ||
                          transaction.returnDate.$date === null ||
                          transaction.returnDate.$date === undefined
                            ? "--"
                            : getDate(transaction.returnDate.$date)
                        }`}</td>
                        <td style={{ textAlign: "center" }}>
                          {transaction.lateFee}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            variant="outline-primary"
                            onClick={() =>
                              handleReturn(transaction.copyId.$oid, index)
                            }
                            disabled={transaction.status === "returned"}
                          >
                            {" "}
                            {loadingBtn[
                              `${transaction.copyId.$oid}-${index}`
                            ] ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                {" Return"}
                              </>
                            ) : (
                              "Return"
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <ToastItem
        showToast={showToast}
        {...toastObject}
        toggleToast={toggleShowtoast}
      />
    </>
  );
};

const getDate = (date: string) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

export default TransactionComp;
