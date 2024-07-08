import {
  Breadcrumb,
  Button,
  Col,
  Container,
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
import { useBooks } from "../../bookcontext/BookContext";
const AddBranch = () => {
  const [addBranchToggle, setAddBranchToggle] = useState(false);
  const { branches, setBranches } = useBooks();
  const [branchesList, setBranchesList] = useState<Branch[]>(branches);

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/branches`);
      const data = await response.json();
      console.log("Branches Data", data);
      setBranches(data);
      setBranchesList(data);
    } catch (error) {
      console.error("Error fetching branches", error);
    }
  };
  useEffect(() => {
    if (branches.length === 0) fetchBranches();

    //setBranchesList(branchesList);
  }, []);

  const [branch, setBranch] = useState<Branch>({
    _id: { $oid: "" },
    name: "",
    address: "",
    state: "",
    zip: 0,
  });

  const [validated, setValidated] = useState(false);

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

    branchesList.push(branch);
    setBranch({
      _id: { $oid: "" },
      name: "",
      address: "",
      state: "",
      zip: 0,
    });
    setAddBranchToggle(!addBranchToggle);

    console.log(branchesList);
  };

  return (
    <>
      <Container style={{ paddingTop: "20px", paddingBottom: "100px" }}>
        <Breadcrumb>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <Breadcrumb.Item active>Add Branch</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="justify-content-evenly">
          <Col lg="10" md="10" xs="auto" sm="auto">
            {branchesList.length === 0 ? (
              <h3> No Branches Found</h3>
            ) : (
              <>
                <h3 className="mb-4">Add New Branch </h3>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Branch Name</th>
                      <th>Address</th>
                      <th>State</th>
                      <th>Zip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchesList.map((branch, index) => (
                      <tr key={branch._id.$oid}>
                        <td>{branch._id.$oid}</td>
                        <td>{branch.name}</td>
                        <td>{branch.address}</td>
                        <td>{branch.state}</td>
                        <td>{branch.zip}</td>
                      </tr>
                    ))}
                    {addBranchToggle && (
                      <tr>
                        <td>{branch._id.$oid}</td>
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
                <Button style={{ marginRight: "10px" }} onClick={handleSubmit}>
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
    </>
  );
};

export default AddBranch;
