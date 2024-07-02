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
  const [counter, setCounter] = useState(0);

  const handleCounter = (num: number, branch: Branch) => {
    setCounter(counter + num);
    if (branch.count === undefined) {
      branch.count = 0;
    }
    branch.count += num;

    console.log(`For ${branch.name} added ${num} of books. `);
    //setCounter(num);
    console.log(branch);
    console.log(counter);
    onCountChange(num, branch);
  };

  return (
    <div key={branch.id} className="item-container">
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
