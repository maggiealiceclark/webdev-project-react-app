import React from "react";
import {Container, FormControl, InputGroup} from 'react-bootstrap';
import Section from "./SearchScreen/Section";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import "./index.css"

const Search = () => {
  const title = ["Songs", "Artists", "Albums", "Playlists"]
  return (
    <Container>
      <div>
        <InputGroup className="ms-0 m-4">
          <Form.Control
            placeholder="What do you want to listen to?"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
        {title.map((title) => (
          <Section index={title}></Section>
          ))}
      </div>
    </Container>
  );
}
export default Search