import { Button, Form, InputGroup } from "react-bootstrap";
import { SearchFormProps } from "../../model/Definitions";
import { ChangeEvent } from "react";
import FormEvent from "react";

const BookSearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  //   const handleOnSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     event.preventDefault();
  //     console.log(event.target.value);
  //   };

  return (
    <Form onSubmit={onSearchSubmit}>
      <InputGroup className="mb-3" onSubmit={onSearchSubmit}>
        <Form.Control
          type="text"
          placeholder="Search Book ..."
          aria-label="Search-Book"
          aria-describedby="input-search"
          onChange={onSearchInput}
          value={searchTerm}
        />
        <Button type="submit" variant="outline-secondary" id="search-button">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export { BookSearchForm };
