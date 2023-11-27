import React from "react";
import {Container} from 'react-bootstrap';
import Section from "./Section";

const Search = () => {
  const title = ["Songs", "Artists", "Albums", "Playlists", "Albums"]
  return (
    <Container>
      <div>
        {title.map((title) => (
          <Section index={title}></Section>
          ))}
      </div>
    </Container>
  );
}
export default Search