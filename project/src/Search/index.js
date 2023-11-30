import React, {useEffect, useState} from "react";
import {Container, InputGroup} from 'react-bootstrap';
import Section from "./SearchScreen/Section";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import "./index.css"
import {getToken, getArtists} from "../APIService/service"

const Search = () => {
  const title = ["Songs", "Artists", "Albums", "Playlists"]
  const [accessToken, setAccessToken] = useState("")
  const [result, setResult] = useState({
    Songs: null,
    Artists: null,
    Albums: null,
    Playlists: null,
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
    console.log(accessToken)
    const res = await getArtists(accessToken, searchQuery, ["track", "artist", "album", "playlist"])
    setResult({
      Songs: res.tracks.items,
      Artists: res.artists.items,
      Albums: res.albums.items,
      Playlists: res.playlists.items,
    });
    console.log(res)
  }

  return (
    <Container>
      <div>
        <InputGroup className="ms-0 m-4">
          <Form.Control
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={searchArtist}>
            Search
          </Button>
        </InputGroup>
        {console.log(result)}
        {result.Albums !== null && result.Songs && result.Artists && result.Playlists
          && title.map((title) => (
            <Section key={title} index={title} result={result[title]}></Section>
          ))}
      </div>
    </Container>
  );
}
export default Search