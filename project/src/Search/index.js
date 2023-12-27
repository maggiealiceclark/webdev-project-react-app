import React, {useEffect, useState} from "react";
import {Container, InputGroup} from 'react-bootstrap';
import Section from "./SearchScreen/Section";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import "./index.css"
import {getToken, getSearchResult} from "../APIService/service"

const Search = () => {
  const title = ["Songs", "Artists", "Albums"]
  const [accessToken, setAccessToken] = useState("");
  const [result, setResult] = useState({
    Songs: null,
    Artists: null,
    Albums: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const res = await getToken()
      setAccessToken(res)
    }
    fetchToken()
  }, []);

  const searchArtist = async () => {
    const res = await getSearchResult(accessToken, searchQuery, ["track", "artist", "album"])
    setResult({
      Songs: res.tracks.items,
      Artists: res.artists.items,
      Albums: res.albums.items,
    });
  }

  return (
    <Container>
      <div>
        <InputGroup className="ms-0 m-4 wd-searchbar">
          <Form.Control
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchArtist();
              }}}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={searchArtist}>
            Search
          </Button>
        </InputGroup>
        {result.Albums !== null && result.Songs && result.Artists && title.map((title) => (
          <Section key={title} title={title} result={result[title]}></Section>
        ))}
      </div>
    </Container>
  );
}
export default Search;