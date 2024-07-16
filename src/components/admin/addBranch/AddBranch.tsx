import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Fade,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import "./AddBranch.css";
//import { branchesList } from "../../../data/Branches_dummy";
import { API_ENDPOINT } from "../../../model/Constants";
import { useEffect, useState } from "react";
import { Branch } from "../../../model/Definitions";
import { Link } from "react-router-dom";

import { useBookStoreContext } from "../../bookcontext/BookStoreContext";
import { insertBranch, removeBranchAPI } from "../../../utils/BranchService";
import BreadcrumbComp from "../../common/BreadcrumbComp";
const AddBranch = () => {
  const [addBranchToggle, setAddBranchToggle] = useState(false);
  const [validated, setValidated] = useState(false);
  const { branches, addBranches, removeBranch } = useBookStoreContext();
  const [branchesList, setBranchesList] = useState<Branch[]>(branches);

  useEffect(() => {
    setBranchesList(branches);
  }, [branches]);
  const addNewBranch = (branch: Branch) => {
    insertBranch(branch)
      .then((newBranch) => {
        console.log("New Branch", newBranch);
        addBranches([newBranch]);
      })
      .catch((error) => {
        console.error("Error adding branch", error);
      });
  };

  const [branch, setBranch] = useState<Branch>({
    _id: { $oid: "" },
    name: "",
    address: "",
    state: "",
    zip: 0,
  });

  const handleRemoveBranch = (branchId: string) => {
    removeBranchAPI(branchId)
      .then(() => {
        console.log("Branch Removed");
        removeBranch(branchId);
        setValidated(false);
      })
      .catch((error) => {
        console.error("Error removing branch", error);
      });
  };
  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });

    console.log(branch);
  };

  const handleSubmit = () => {
    setValidated(true);

    if (
      branch.name === "" ||
      branch.address === "" ||
      branch.state === "" ||
      branch.zip === 0
    ) {
      return;
    }

    //setBranches([...branches, branch]);
    addNewBranch(branch);
    //branchesList.push(branch);
    setBranch({
      _id: { $oid: "" },
      name: "",
      address: "",
      state: "",
      zip: 0,
    });
    setAddBranchToggle(!addBranchToggle);

    console.log(branches);
  };

  return (
    <>
      <Fade appear in={true}>
        <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <BreadcrumbComp active={"Branches"} />
          <Row className="justify-content-evenly">
            <Col lg="10" md="10" xs="auto" sm="auto">
              {branchesList.length === 0 ? (
                <h3> No Branches Found</h3>
              ) : (
                <>
                  <h3 className="mb-4">Branches </h3>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        {/* <th>#</th> */}
                        <th>Branch Name</th>
                        <th>Address</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branchesList.map((branch, index) => (
                        <tr key={branch._id.$oid}>
                          {/* <td>{branch._id.$oid}</td> */}
                          <td>{branch.name}</td>
                          <td>{branch.address}</td>
                          <td>{branch.state}</td>
                          <td>{branch.zip}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() =>
                                handleRemoveBranch(branch._id.$oid)
                              }
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {addBranchToggle && (
                        <tr>
                          {/* <td>{branch._id.$oid}</td> */}
                          <td>
                            <Form.Control
                              type="text"
                              placeholder="Branch Name"
                              name="name"
                              value={branch.name}
                              onChange={handleOnInputChange}
                              isInvalid={validated && branch.name === ""}
                            />
                          </td>
                          <td>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Address"
                              name="address"
                              value={branch.address}
                              onChange={handleOnInputChange}
                              isInvalid={validated && branch.address === ""}
                            />
                          </td>
                          <td>
                            <Form.Control
                              required
                              type="text"
                              placeholder="State"
                              name="state"
                              value={branch.state}
                              onChange={handleOnInputChange}
                              isInvalid={validated && branch.state === ""}
                            />
                          </td>
                          <td>
                            <Form.Control
                              required
                              type="number"
                              placeholder="Zip code"
                              name="zip"
                              value={branch.zip}
                              onChange={handleOnInputChange}
                              isInvalid={validated && branch.zip === 0}
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </>
              )}
              {!addBranchToggle && (
                <Button
                  onClick={() => {
                    setAddBranchToggle(!addBranchToggle);
                  }}
                >
                  Add Branch
                </Button>
              )}
              {addBranchToggle && (
                <>
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={() => {
                      setAddBranchToggle(!addBranchToggle);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Fade>
    </>
  );
};

export default AddBranch;
