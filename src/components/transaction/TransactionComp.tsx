import { useState } from "react";
import { Transaction } from "../../model/Definitions";
import { Container } from "react-bootstrap";
import BreadcrumbComp from "../common/BreadcrumbComp";

const TransactionComp = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  return (
    <>
      <Container style={{ paddingTop: "20px", paddingBottom: "100px" }}>
        <BreadcrumbComp active={"Transactions"} />
        <h1>Transaction page</h1>
      </Container>
    </>
  );
};

export default TransactionComp;
