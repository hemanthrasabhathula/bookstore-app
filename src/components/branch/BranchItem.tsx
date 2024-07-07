import { useState } from "react";
import { Branch } from "../../model/Definitions";
import { Button } from "react-bootstrap";
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
    <div className="item-container">
      <li>{branch.name}</li>
      <div className="button-input-container">
        <Button
          disabled={counter === 0}
          onClick={() => {
            counter > 0 && handleCounter(-1, branch);
          }}
        >
          -
        </Button>{" "}
        <input
          type="number"
          key={branch.id}
          className="quantity-input"
          value={counter}
          id={`quantity-input${branch.id}`}
          // onChange={(e) => {
          //   handleCounter(parseInt(e.target.value || "0"), branch);
          // }}
          onChange={(e) => {
            // Assuming handleCounter is designed to correctly update the counter state
            // based on the new input value. Adjust as necessary for your application logic.
            if (parseInt(e.target.value) < 0) {
              e.target.value = "0";
              return;
            }
            const newValue = parseInt(e.target.value, 10);
            if (!isNaN(newValue)) {
              // Check if the parsed value is a number
              handleCounter(newValue - counter, branch); // Adjust the counter based on the difference
            }
          }}
        />
        <Button
          onClick={() => {
            handleCounter(+1, branch);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default BranchItem;
