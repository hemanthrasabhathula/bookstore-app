import {
  Breadcrumb,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
} from "react-bootstrap";
import "./AddBook.css";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { Row } from "react-bootstrap";
import { Branch } from "../../../model/Definitions";
import { Link } from "react-router-dom";
import { useBookStoreContext } from "../../bookcontext/BookStoreContext";
import BranchItem from "../../branch/BranchItem";
import imagePlaceHolder from "../../../assets/image_placeholder.png";
type FormData = {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  published: string;
  pages: string;
  image: string;
  branchCopy: BranchCopy[];
};

type BranchCopy = {
  branch: string;
  copies: string;
};

const AddBook = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    published: "",
    pages: "",
    image: "",
    branchCopy: [{ branch: "", copies: "" }],
  });

  const { branches } = useBookStoreContext();
  const [branchesList, setBranchesList] = useState<Branch[]>(branches);

  useEffect(() => {
    setBranchesList(branches);
  }, [branches]);

  const handleFormData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      //e.preventDefault();
    }
    setValidated(true);
    const data = new FormData(e.currentTarget);
    console.log("Form Data", data);
    const formDataObj = Object.fromEntries(data.entries());
    console.log("Form Data JSON", JSON.stringify(formDataObj));

    console.log("formData:: ", formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCopiesChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log("handleCopiesChange", e.target.value, index);
    const { name, value } = e.target;
    const updatedBranchCopy = [...formData.branchCopy];
    console.log("Updated Branch Copy", updatedBranchCopy);
    if (name === "copies") {
      updatedBranchCopy[index].copies = value;
    }

    setFormData({
      ...formData,
      branchCopy: updatedBranchCopy,
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    console.log("handleSelectChange", value, index);
    const updatedBranchCopy = [...formData.branchCopy];
    console.log("Updated Branch Copy", updatedBranchCopy);
    if (name === "branch") {
      updatedBranchCopy[index].branch = value;
    }

    setFormData({
      ...formData,
      branchCopy: updatedBranchCopy,
    });
  };

  return (
    <>
      <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Breadcrumb>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <Breadcrumb.Item active>Add Book</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="justify-content-evenly">
          <Col lg="5" md="5" xs="auto" sm="auto">
            <h3 className="mb-4">Add New Book </h3>
            <Form noValidate validated={validated} onSubmit={handleFormData}>
              <FloatingLabel
                style={{ paddingLeft: "0" }}
                controlId="title"
                label="Title"
                className="mb-3"
              >
                <Form.Control
                  required
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  isInvalid={validated && !formData.title}
                />
                <Form.Control.Feedback type="invalid">
                  please enter a title.
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel controlId="author" label="Author" className="mb-3">
                <Form.Control
                  required
                  type="text"
                  placeholder="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  isInvalid={validated && !formData.author}
                />
                <Form.Control.Feedback type="invalid">
                  please enter author name.
                </Form.Control.Feedback>
              </FloatingLabel>
              <Row className="g-2">
                <Col md sm xs>
                  <FloatingLabel
                    controlId="isbn"
                    label="ISBN"
                    className="mb-3 "
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="ISBN"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      isInvalid={validated && !formData.isbn}
                    />
                    <Form.Control.Feedback type="invalid">
                      please enter the ISBN.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md sm xs>
                  <FloatingLabel
                    controlId="genre"
                    label="Genre"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="Genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      isInvalid={validated && !formData.genre}
                    />
                    <Form.Control.Feedback type="invalid">
                      please select a genre.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="g-2">
                <Col md sm xs>
                  <FloatingLabel
                    controlId="published"
                    label="Published Year"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="number"
                      placeholder="Published"
                      name="published"
                      value={formData.published}
                      onChange={handleInputChange}
                      isInvalid={validated && !formData.published}
                    />
                    <Form.Control.Feedback type="invalid">
                      please enter the published date.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md sm xs>
                  <FloatingLabel
                    controlId="pages"
                    label="No of Pages"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="number"
                      placeholder="Pages"
                      name="pages"
                      value={formData.pages}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.target.value);
                        if (
                          (e.target.value.length <= 4 &&
                            !isNaN(parseInt(e.target.value))) ||
                          e.target.value === ""
                        ) {
                          console.log("Valid");
                          handleInputChange(e);
                        }
                      }}
                      isInvalid={validated && !formData.pages}
                    />
                    <Form.Control.Feedback type="invalid">
                      please enter no of pages.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
              <FloatingLabel
                controlId="image"
                label="Image Url"
                className="mb-3"
              >
                <Form.Control
                  required
                  type="Url"
                  placeholder="Image Url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  isInvalid={validated && !formData.image}
                />
                <Form.Control.Feedback type="invalid">
                  please enter a valid url.
                </Form.Control.Feedback>
              </FloatingLabel>
              {formData.branchCopy.map((branch, index) => (
                <BranchesForm
                  key={index}
                  formData={formData}
                  branchesList={branchesList}
                  handleSelectChange={handleSelectChange}
                  handleCopiesChange={handleCopiesChange}
                  validated={validated}
                  index={index}
                />
              ))}
              {branchesList.length !== formData.branchCopy.length && (
                <Button
                  variant="link"
                  className="mb-3"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      branchCopy: [
                        ...formData.branchCopy,
                        { branch: "", copies: "" },
                      ],
                    });
                  }}
                >
                  + Add Branch
                </Button>
              )}
              <Row className="g-2">
                <Button type="submit">Submit</Button>
              </Row>
            </Form>
          </Col>

          <Col lg="5" md="5" xs="auto" sm="auto">
            <Row
              id="image"
              style={{
                height: "380px",
                width: "100%", // Set a fixed width if needed, e.g., width: "400px"
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Col lg="auto" md="auto" xs="auto" sm="auto">
                <Image
                  style={{
                    width: "200px",
                    aspectRatio: "2/3",
                    objectFit: "cover",
                    borderRadius: "0.375rem",
                  }}
                  src={
                    formData.image === "" ? imagePlaceHolder : formData.image
                  }
                  alt={formData.image}
                />
              </Col>
            </Row>
            <Row
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Col lg="auto" md="auto" xs="auto" sm="auto">
                <div>
                  <b>{`Title: ${formData.title}`}</b>
                </div>
                <div>{`Author: ${formData.author}`}</div>
                <div>{`ISBN: ${formData.isbn}`}</div>
                <div>{`Genre: ${formData.genre}`}</div>
                <div>{`Published: ${formData.published}`}</div>
                <div>{`Pages: ${formData.pages}`}</div>
                <br></br>
                {branchesList.map((branch) =>
                  formData.branchCopy.map(
                    (branchCopy) =>
                      branchCopy.branch === branch._id.$oid && (
                        <div key={branchCopy.branch}>
                          <div>{`Branch: ${branch.name} `}</div>
                          <div>{` Copies:  ${branchCopy.copies}`}</div>
                        </div>
                      )
                  )
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const BranchesForm = ({
  formData,
  branchesList,
  handleSelectChange,
  handleCopiesChange,
  validated,
  index,
}: {
  formData: FormData;
  branchesList: Branch[];
  handleSelectChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => void;
  handleCopiesChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  validated: boolean;
  index: number;
}) => {
  const [newBranch, setNewBranch] = useState<Branch[]>(
    branchesList.filter((branch) => {
      return !formData.branchCopy.some((branchCopy) => {
        return branchCopy.branch === branch._id.$oid;
      });
    })
  );
  useEffect(() => {
    setNewBranch(
      branchesList.filter((branch) => {
        return !formData.branchCopy.some((branchCopy) => {
          return branchCopy.branch === branch._id.$oid;
        });
      })
    );
  }, []);

  useEffect(() => {
    setNewBranch(
      branchesList.filter((branch) => {
        return !formData.branchCopy.some((branchCopy) => {
          return branchCopy.branch === branch._id.$oid;
        });
      })
    );
  }, [branchesList]);

  return (
    <>
      <Row className="g-2">
        <Col md sm xs>
          <FloatingLabel
            controlId={`branch${index}`}
            label="Select Branch"
            className="mb-3"
          >
            <Form.Select
              required
              aria-label="Select Branch"
              className="mb-3"
              name="branch"
              value={formData.branchCopy[index].branch}
              onChange={(e) => handleSelectChange(e, index)}
              isInvalid={validated && !formData.branchCopy[index].branch}
            >
              <option></option>
              {newBranch.map((branch) => (
                <option key={branch._id.$oid} value={branch._id.$oid}>
                  {branch.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              please select a branch.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col md sm xs>
          <FloatingLabel
            controlId={`copies${index}`}
            label="Copies"
            className="mb-3"
          >
            <Form.Control
              required
              type="number"
              placeholder="Copies"
              name="copies"
              value={formData.branchCopy[index].copies}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleCopiesChange(e, index)
              }
              isInvalid={validated && !formData.branchCopy[index].copies}
            />
            <Form.Control.Feedback type="invalid">
              please enter no of copies.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
    </>
  );
};

export default AddBook;
