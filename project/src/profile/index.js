
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap"; // Import Navbar components
import { Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";
import Logo from "../images/Picture1.png";

function Profile() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" >
        <Container>
     
        <div className="profile-photo">
        <img class="rounded-circle" src={Logo} alt="Logo " style={{height: "200px"}} />
          </div>
          <Navbar.Brand as={Link} to="/" className="mx-auto" >
            That guy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" >
              <Nav.Link as={Link} to="/EditProfile">Edit My Profile</Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container">
      
      <div className="row">
        {/* FIRST COLUMN*/}
      
        <div className="col-md-4">
          <div>
            <h2>My Most Recent Tracks</h2>
          </div>
        </div>
        {/* SECOND COLUMN */}
        <div className="col-md-4">
        
          <div className="profile-info">
            <h2>My Name</h2>
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
      
        <div className="col-md-4">
          <Link
            // to={`/Kanbas/Courses/${courseId}/Assignments/AssignmentEditor`}
            to={"/EditProfile"}
            className="btn secondary"
            style={{
              borderColor: "black",
              padding: "10px",
              float: "right",
              position: "relative",
              top: "-20%",
            }}
          >
            Edit My Profile
          </Link>
          <div>
            <h2>My Top Artists</h2>
          </div>
          <div className="list">
            <h2>My List of Friends, Imported From Somewhere..</h2>
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

export default Profile;


