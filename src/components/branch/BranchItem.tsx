import { useState } from "react";
import { Branch } from "../../model/Definitions";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "./BranchItem.css";

const BranchItem = ({
  branch,
  onCountChange,
}: {
  branch: Branch;
  onCountChange: (num: number, branch: Branch) => void;
}) => {
  console.log("branch Item Loaded ", branch);
  const [counter, setCounter] = useState(branch.count || 0);
  const [branchCopy, setBranchCopy] = useState<Branch>({ ...branch });

  const handleCounter = (num: number, branch: Branch) => {
    if (branchCopy.count === undefined) {
      branchCopy.count = 0;
    }
    branchCopy.count += num;
    console.log("branchCopy ", branchCopy);

    setCounter(counter + num);
    setBranchCopy(branchCopy);
    onCountChange(num, branchCopy);
  };

  return (
    <Row className="justify-content-start mb-1">
      <Col xs={5} sm={5} md={4} lg={5} className="align-content-center">
        {branch.name}
      </Col>
      <Col
        xs={5}
        sm={5}
        md={"auto"}
        lg={"auto"}
        className="align-content-center"
      >
        <InputGroup>
          <Button
            variant="outline-primary"
            id="button-addon2"
            disabled={counter === 0}
            onClick={() => {
              counter > 0 && handleCounter(-1, branch);
            }}
          >
            {`-`}
          </Button>
          <Form.Control
            type="number"
            readOnly={true}
            key={branch._id.$oid}
            placeholder="0"
            aria-label="copies"
            style={{
              maxWidth: "46px",
              backgroundColor: "transparent",
              border: "none",
            }}
            id={`quantity-input${branch._id.$oid}`}
            value={counter}
            onChange={(e) => {
              if (parseInt(e.target.value) < 0) {
                e.target.value = "0";
                return;
              }
              const newValue = parseInt(e.target.value, 10);
              if (!isNaN(newValue)) {
                handleCounter(newValue - counter, branch);
              }
            }}
          />
          <Button
            variant="outline-primary"
            id="button-addon2"
            disabled={counter === 5}
            onClick={() => {
              handleCounter(+1, branch);
            }}
          >
            {`+`}
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default BranchItem;
