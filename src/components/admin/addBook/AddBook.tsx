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
import { Branch, Copy } from "../../../model/Definitions";
import { Link } from "react-router-dom";
import { useBookStoreContext } from "../../bookcontext/BookStoreContext";
import BranchItem from "../../branch/BranchItem";
import imagePlaceHolder from "../../../assets/image_placeholder.png";
import { addCopies } from "../../../utils/CopyService";
import ConfirmationModal from "../../common/ConfirmationModal";
// type FormData = {
//   title: string;
//   author: string;
//   ISBN: string;
//   genre: string;
//   published: string;
//   pages: string;
//   image: string;
//   branchCopy: BranchCopy[];
// };

// type BranchCopy = {
//   branch: string;
//   copies: string;
// };

const AddBook = () => {
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<Copy>({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    published: 0,
    pages: 0,
    image: "",
    branchCopy: [{ branchName: "", branchId: "", copies: 0 }],
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
    // Validate form data
    const errors: { [key: string]: string } = {};
    if (!formDataObj.title) {
      errors.title = "Title is required";
    }
    if (!formDataObj.author) {
      errors.author = "Author is required";
    }

    if (!formDataObj.ISBN) {
      errors.ISBN = "ISBN is required";
    }

    if (!formDataObj.genre) {
      errors.genre = "Genre is required";
    }

    if (!formDataObj.published) {
      errors.published = "Published is required";
    }

    if (!formDataObj.pages) {
      errors.pages = "Pages is required";
    }

    if (!formDataObj.image) {
      errors.image = "Image is required";
    }

    formData.branchCopy.forEach((branchCopy, index) => {
      if (!branchCopy.branchId) {
        errors[`branch${index}`] = "Branch is required";
      }
      if (!branchCopy.copies) {
        errors[`copies${index}`] = "Copies is required";
      }
    });

    console.log("formData:: ", formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setShowModal(true);

    console.log("formData to be submitted :: ", formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ((name === "published" || name === "pages") && value !== "") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCopiesChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    console.log("handleCopiesChange", e.target.value, index);
    const { name, value } = e.target;
    const updatedBranchCopy = [...formData.branchCopy];
    updatedBranchCopy[index].copies = 0;
    console.log("Updated Branch Copy", updatedBranchCopy);
    if (name === "copies" && value !== "") {
      updatedBranchCopy[index].copies = parseInt(value);
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
    const selectedOption = e.target.options[e.target.selectedIndex];
    const branchName = selectedOption.text;
    const branchId = selectedOption.value;
    console.log("Selected Branch", branchName);
    // const { name, value } = e.target;
    // console.log("handleSelectChange", value, index);
    // const updatedBranchCopy = [...formData.branchCopy];
    // console.log("Updated Branch Copy", updatedBranchCopy);
    // if (name === "branch") {
    //   updatedBranchCopy[index].branch = value;
    // }

    const updatedBranches = formData.branchCopy.map((branch, i) =>
      i === index
        ? { ...branch, branchName: branchName, branchId: branchId }
        : branch
    );

    setFormData({
      ...formData,
      branchCopy: updatedBranches,
    });
  };

  const handleOnConfirm = () => {
    setShowModal(false);
    addCopies(formData).then((response) => {
      console.log("Response", response);
    });
  };

  const handleOnClose = () => {
    setShowModal(false);
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
                    controlId="ISBN"
                    label="ISBN"
                    className="mb-3 "
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="ISBN"
                      name="ISBN"
                      value={formData.ISBN}
                      onChange={handleInputChange}
                      isInvalid={validated && !formData.ISBN}
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
                      value={formData.published === 0 ? "" : formData.published}
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
                      value={formData.pages === 0 ? "" : formData.pages}
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
                        { branchName: "", branchId: "", copies: 0 },
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

          <Col lg="4" md="4" xs="auto" sm="auto">
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
                    formData.image.match(".jpg$|.jpeg$|.png$|.gif$/i")
                      ? formData.image
                      : imagePlaceHolder
                  }
                  alt={imagePlaceHolder}
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
                <div>{`ISBN: ${formData.ISBN}`}</div>
                <div>{`Genre: ${formData.genre}`}</div>
                <div>{`Published: ${formData.published}`}</div>
                <div>{`Pages: ${formData.pages}`}</div>
                <br></br>
                {branchesList.map((branch) =>
                  formData.branchCopy.map(
                    (branchCopy) =>
                      branchCopy.branchId === branch._id.$oid && (
                        <div key={branchCopy.branchId}>
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
      <ConfirmationModal
        isOpen={showModal}
        title="Add Book Details"
        message="Confirm to Submit the Book Details"
        onConfirm={handleOnConfirm}
        onClose={handleOnClose}
      />
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
  formData: Copy;
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
        return branchCopy.branchId === branch._id.$oid;
      });
    })
  );
  useEffect(() => {
    setNewBranch(
      branchesList.filter((branch) => {
        return !formData.branchCopy.some((branchCopy) => {
          return branchCopy.branchId === branch._id.$oid;
        });
      })
    );
  }, []);

  useEffect(() => {
    setNewBranch(
      branchesList.filter((branch) => {
        return !formData.branchCopy.some((branchCopy) => {
          return branchCopy.branchId === branch._id.$oid;
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
              value={formData.branchCopy[index].branchId}
              onChange={(e) => handleSelectChange(e, index)}
              isInvalid={validated && !formData.branchCopy[index].branchId}
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
              value={
                formData.branchCopy[index].copies === 0
                  ? ""
                  : formData.branchCopy[index].copies
              }
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
