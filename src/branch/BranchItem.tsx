import { useState } from "react";
import { Branch } from "../model/Definitions";
import { Button } from "react-bootstrap";

const BranchItem = ({
  branch,
  onCountChange,
}: {
  branch: Branch;
  onCountChange: (num: number, branch: Branch) => void;
}) => {
  console.log("branch Item Loaded ", branch);
  const [counter, setCounter] = useState(0);
  const [branchCopy, setBranchCopy] = useState<Branch>({ ...branch });

  const handleCounter = (num: number, branch: Branch) => {
    if (branchCopy.count === undefined) {
      branchCopy.count = 0;
    }
    branchCopy.count += num;
    console.log("branchCopy ", branchCopy);
    //setCounter(num);

    setCounter(counter + num);
    setBranchCopy(branchCopy);
    onCountChange(num, branchCopy);
  };

  return (
    <div className="item-container">
      <li>{branch.name}</li>
      <div className="button-input-container">
        <Button
          onClick={() => {
            counter > 0 && handleCounter(-1, branch);
            //counter > 0 && onCountChange(-1, branch);
          }}
        >
          -
        </Button>{" "}
        <input
          key={branch.id}
          className="quantity-input"
          value={counter}
          onChange={(e) =>
            handleCounter(parseInt(e.target.value || "0"), branch)
          }
        />
        <Button
          onClick={() => {
            handleCounter(+1, branch);
            // onCountChange(+1, branch);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default BranchItem;
