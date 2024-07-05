import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import "./AddBook.css";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { branchesList } from "../../../data/Branches_dummy";
type FormData = {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  published: string;
  pages: string;
  image: string;
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
    branch: "",
    copies: "",
  });

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container
      className="addbook-container"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <h2 className="mb-4">Add New Book </h2>
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
            <FloatingLabel controlId="isbn" label="ISBN" className="mb-3 ">
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
            <FloatingLabel controlId="genre" label="Genre" className="mb-3">
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
        <FloatingLabel controlId="image" label="Image Url" className="mb-3">
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

        <Row className="g-2">
          <Col md sm xs>
            <FloatingLabel
              controlId="branch"
              label="Select Branch"
              className="mb-3"
            >
              <Form.Select
                required
                aria-label="Select Branch"
                className="mb-3"
                name="branch"
                value={formData.branch}
                onChange={handleSelectChange}
                isInvalid={validated && !formData.branch}
              >
                <option></option>
                {branchesList.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
                {/* <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option> */}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                please select a branch.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col md sm xs>
            <FloatingLabel controlId="copies" label="Copies" className="mb-3">
              <Form.Control
                required
                type="number"
                placeholder="Copies"
                name="copies"
                value={formData.copies}
                onChange={handleInputChange}
                isInvalid={validated && !formData.copies}
              />
              <Form.Control.Feedback type="invalid">
                please enter no of copies.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2">
          <Button className="floating-label-container" type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default AddBook;
