// EditProfile.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-bootstrap/Carousel";
import * as client from "../../account/client";
import * as likeClient from "../../likes/client";
import * as service from "../../APIService/service";
import { useSearchParams } from "react-router-dom";
import "../index.css";
import {Form} from "react-bootstrap";

function EditProfile() {
  const [accessToken, setAccessToken] = useState("");
  const [idParam] = useSearchParams();
  const id = idParam.get("id");
  const [profile, setProfile] = useState(null);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = async () => {
    const status = client.updateUser(profile);
  };

  const fetchAccount = async () => {
    const user = await client.account();
    setProfile(user);
    await fetchLikedAlbums(user._id);
  };

  const fetchUser = async (id) => {
    const user = await client.findUserById(id);
    setProfile(user);
    await fetchLikedAlbums(user._id);
  };

  const fetchLikedAlbums = async (userId) => {
    const likes = await likeClient.findAlbumsUserLikes(userId);

    const albumsData = await Promise.all(
      likes.map(async (like) => {
        console.log('accessToken: ' + accessToken);
        const album = await service.getAlbumDetails(accessToken, like.albumId);
        return album;
      })
    );
    setLikedAlbums(albumsData);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await service.getToken();
      console.log("token: " + token);
      setAccessToken(token);

      if (id) {
        fetchUser(id);
      } else {
        fetchAccount();
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">


      <Container className="d-flex align-items-center justify-content-between">
            <div className="profile-photo">
              <img
                className="rounded-circle border"
                src={Logo}
                alt="Logo"
              />
            </div>

            <div className="mx-3 font-weight-bold">
              <h1 style={{ fontSize: "2em" }}>
                Hello, {profile.username}!
              </h1>
            </div>

            <div className="mx-3 text-center">
              {profile.accountCreationDate && (
                <p style={{ fontSize: "2em"}}>
                  {profile.username} has been listening since {" "}
                  {new Date(profile.accountCreationDate).toLocaleDateString()}!
                </p>
              )}
            </div>
            
                <Button
                onClick={updateUser}
                as={Link}
                to="/Profile"
                variant="light"
                className="rounded-pill"
                style={{ margin: "5px" }}>
                To Profile
              </Button>
          </Container>

      <div className="container carousel-container">
        <div className="row" style={{ backgroundColor: "#65cfd4" }}>
          <div className="col-md-4" style={{ backgroundColor: "#65cfd4" }}>
            <div>
              <h2 className="display-5">Liked Albums</h2>
              <Carousel>
                {likedAlbums.map((album) => (
                  <Carousel.Item key={album.id}>
                    <img
                      className="d-block w-100"
                      src={album.images[0].url}
                      alt={album.name}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>

          <div
            className="col-md-4 profile-info"
            style={{
              backgroundColor: "#65cfd4",
              fontFamily: "system-ui",
              color: "white",
            }}
          >
  <div className="col-md-4 profile-info" style={{
      backgroundColor: "#65cfd4",
      fontFamily: "system-ui",
      color: "white",
    }}>
      <h2 className="display-6" style={{ paddingTop: "20px" }}>Settings</h2>

      <Form>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            placeholder="email@example.com"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value})}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new password"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value})}
          />
        </Form.Group>

        <Button
                onClick={updateUser}
                variant="light"
                className="rounded-pill"
                style={{ margin: "5px" }}>
                Save Changes
              </Button>


      </Form>
    </div>

            <div>
              <h2 className="display-5" style={{ paddingTop: "20px" }}>
                My Top Artists
              </h2>
            </div>
                <div className="list">
                  <h2 className="display-6">
                    My List of Friends, Imported From Somewhere..
                  </h2>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
                </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
