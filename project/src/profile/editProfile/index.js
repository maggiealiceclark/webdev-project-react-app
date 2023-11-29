import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap"; // Import Navbar components
import { Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";
import Logo from "../../images/Picture1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../images/Picture1.png';


function EditProfile() {
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
            That guy
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
                That guy has been listening since DATE OF ACCOUNT CREATION!
              </Nav.Link>
              <Nav.Link as={Link} to="/Home">
                That guy's current favorite song is SONG NAME
              </Nav.Link>
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
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
      className="d-block w-100"
      src="../../images/Picture1.png" // Replace with your image source
      alt="First slide"
    />        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
      className="d-block w-100"
      src="../../images/Picture1.png" // Replace with your image source
      alt="First slide"
    />        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
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
                My Name
              </h2>
              <p>Email: myemail.com</p>
              <a
                href="https://example.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Social Media Link
              </a>
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