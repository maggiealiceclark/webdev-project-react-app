import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap"; // Import Navbar components
import { Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";
import Logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-bootstrap/Carousel";
import * as client from "../../account/client";
import { changeEmail } from "../../account/client";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import "./index.css";
import { useUser } from "../../account/UserContext.js";
import "./index.css";
import { getSearchResult, getToken } from "../../APIService/service.js";
 
function EditProfile({ artistId }) {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [test] = useSearchParams();
  const nid = test.get("id");
  const { user, setUser, favoriteArtist, setFavoriteArtist } = useUser();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  // Example of declaring 'artistName'
const artistName = "SomeName";
 
// Example of importing 'navigate'
 
 
  // const [favoriteArtist, setFavoriteArtist] = useState("");
  const handleChangeEmail = async () => {
    try {
      console.log("the id", id, nid);
      const result = await changeEmail(email, nid);
      setProfile({ ...profile, email: email });
 
      if (result) {
        alert("Email changed successfully");
      } else {
        console.error("changeEmail API call did not work");
      }
    } catch (error) {
      // Handle errors
      console.error("Error changing email:", error);
    }
  };
 
  const handleChangeArtist = (e) => {
    setFavoriteArtist(e.target.value);
  };
 
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setProfile(user);
    setIsLoading(false);
  };
 
  const fetchAccount = async () => {
    const account = await client.account();
    setProfile(account);
    setIsLoading(false);
  };
  const handleSaveChanges = async () => {
    try {
      if (!favoriteArtist) {
        console.error("Favorite artist is undefined.");
        return;
      }
 
      // Make an API call to search for the artist using the artistName
      const token = await getToken();
      const searchResult = await getSearchResult(accessToken, artistName, ["artist"]);
      const selectedArtist = searchResult.artists.items[0];
 
      if (!selectedArtist) {
        console.error("Artist not found.");
        return;
      }
 
      // Update the user context with the new favorite artist
      setUser({ ...user, favoriteArtist: selectedArtist.name });
 
      // Check if the typed favorite artist matches the selected artist name
      if (favoriteArtist === selectedArtist.name) {
        // Optionally, you can show a success message to the user
        alert("Favorite artist saved successfully!");
 
        // Extract artist ID from the search result
        const selectedArtistId = selectedArtist.id;
 
        // Navigate to the artist details page
        navigate(`/search/${encodeURIComponent(artistName)}/${encodeURIComponent(selectedArtistId)}`);
      } else {
        console.error("Typed favorite artist does not match the selected artist.");
      }
    } catch (error) {
      console.error("Error saving favorite artist:", error);
    }
  };
 
 
  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);
 
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#2281a7", fontFamily: "system-ui" }}
        variant="dark"
        expand="lg"
      >
        <Container>
          <div className="profile-photo">
            <img
              class="rounded-circle border"
              style={{ height: "200px", padding: "10px", margin: "10px" }}
              src={Logo}
              alt="Logo "
            />
          </div>
          <Navbar.Brand
            as={Link}
            to="/"
            className="mx-auto font-weight-bold"
            style={{ padding: "5px" }}
          >
            {profile.username}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/Profile">
                Save Changes To My Profile
              </Nav.Link>
              <FontAwesomeIcon
                icon="fas fa-cogs"
                style={{ color: "#65cfd4" }}
              />
              <Nav.Link as={Link} to="/Home">
                {profile.username} has been listening since{" "}
                {profile.accountCreationDate && (
                  <p>
                    {new Date(profile.accountCreationDate).toLocaleDateString()}
                    !
                  </p>
                )}
              </Nav.Link>
           
              <Nav.Item>
                <div>
                  <label>New Favorite Artist:</label>
                  <input
                    type="text"
                    value={favoriteArtist}
                    onChange={handleChangeArtist}
                    placeholder="Type your favorite artist here"
                  />
                  <button onClick={handleSaveChanges}>
                    Save Favorite Artist
                  </button>
                </div>
                {/* Link to the artist detail page */}
                <Link
                  key={"1"}
                  to={`/Search/${encodeURIComponent(
                    favoriteArtist
                  )}/${encodeURIComponent(artistId)}`}
                  className={"mt-2 favorite-artist-link"}
                >
                  {favoriteArtist}
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
 
      <div
        className="container"
        style={{
          backgroundColor: "#65cfd4",
          margin: "50px",
          marginLeft: "100px",
        }}
      >
        <div className="row" style={{ backgroundColor: "#65cfd4" }}>
          {/* FIRST COLUMN*/}
 
          <div className="col-md-4" style={{ backgroundColor: "#65cfd4" }}>
            <div>
              <h2
                class="display-5"
                style={{
                  paddingTop: "20px",
                  fontFamily: "system-ui",
                  color: "white",
                }}
              >
                My Most Recent Tracks
              </h2>
 
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="../../images/Picture1.png" // Replace with your image source
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="../../images/Picture1.png" // Replace with your image source
                    alt="First slide"
                  />{" "}
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="../../images/Picture1.png" // Replace with your image source
                    alt="First slide"
                  />{" "}
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
          {/* SECOND COLUMN */}
          <div
            className="col-md-4"
            style={{
              backgroundColor: "#65cfd4",
              fontFamily: "system-ui",
              color: "white",
            }}
          >
            <div className="profile-info">
              <h2 class="display-6" style={{ paddingTop: "20px" }}>
                {profile.username} Settings
              </h2>
              <br></br>
              <label>New Email:</label>
              <input
                style={{ padding: "5px", margin: "5px" }}
                type="email"
                value={profile.email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button onClick={handleChangeEmail}>Change Email</button>
            </div>
          </div>
          {/* THIRD COLUMN */}
 
          <div
            className="col-md-4"
            style={{
              backgroundColor: "#65cfd4",
              fontFamily: "system-ui",
              color: "white",
            }}
          >
            <div>
              <h2 class="display-5" style={{ paddingTop: "20px" }}>
                My Top Artists
              </h2>
            </div>
            <div className="list">
              <h2 class="display-6">
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
 