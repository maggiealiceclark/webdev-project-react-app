import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import { getArtistImage, getTrackImage, getToken } from '../APIService/service';
import { getTopArtists, getTopTracks } from '../APIService/lastfmservice';
import * as client from "../account/client";

function Home({ signoutStatus }) {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState(null);

const [isAuthenticated, setIsAuthenticated] = useState(() => {
  const savedAuthState = localStorage.getItem("isAuthenticated");
  console.log("savedAuthState: " + savedAuthState);
  return savedAuthState !== null ? JSON.parse(savedAuthState) : false;
});

const fetchAccount = async () => {
    const account = await client.account();
    console.log("account: " + Object.keys(account));
    setProfile(account);
    setProfileLoading(false);
};


  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      setAccessToken(token);

      const topArtists = await getTopArtists();
      const topTracks = await getTopTracks();

      const updatedArtists = await Promise.all(
        topArtists.artists.artist.map(async (artist) => {
          const imageUrl = await getArtistImage(accessToken, artist.name);
          return { ...artist, imageUrl };
        })
      );

      const updatedTracks = await Promise.all(
        topTracks.tracks.track.map(async (track) => {
          const imageUrl = await getTrackImage(accessToken, track.name);
          return { ...track, imageUrl };
        })
      );

      setArtists(updatedArtists);
      setTracks(updatedTracks);
      setLoading(false);
      fetchAccount();
    };

    fetchData();
  }, [isAuthenticated, signoutStatus]);

  return (
    <Container>
    <Container>
      <Row className="mt-3">
        <Col>
          {profile ? (
            <div className="alert alert-success">
              {profileLoading ? 'Loading user...' : `Welcome, ${profile.username}!`}
            </div>
          ) : (
            <div className="alert alert-info">
              Please log in to see personalized content.
            </div>
          )}
        </Col>
      </Row>
    </Container>
      <h1>Top Artists</h1>
      <div className="d-flex overflow-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Row className="flex-nowrap">
            {artists.map((artist, index) => (
              <Col key={index} className="pr-2">
                <Card style={{ width: '18rem', margin: '10px' }}>
                  <Card.Img
                    variant="top"
                    style={{ height: '200px', objectFit: 'cover' }}
                    src={artist.imageUrl}
                  />
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <h1>Top Tracks</h1>
      <div className="d-flex overflow-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Row className="flex-nowrap">
            {tracks.map((track, index) => (
              <Col key={index} className="pr-2">
                <Card style={{ width: '18rem', margin: '10px' }}>
                  <Card.Img
                    variant="top"
                    style={{ height: '200px', objectFit: 'cover' }}
                    src={track.imageUrl}
                  />
                  <Card.Body>
                    <Card.Title>{track.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
    
  );
}

export default Home;