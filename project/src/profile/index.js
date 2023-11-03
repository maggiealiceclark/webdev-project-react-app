
import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";

function Profile() {
  return (
    <div className="container">
      
      <h1>Profile</h1>
      <div className="row">
        {/* FIRST COLUMN*/}

        <div className="col-md-4">
          <div>
            <h2>My Most Recent Tracks</h2>
          </div>
        </div>
        {/* SECOND COLUMN */}
        <div className="col-md-4">
          <h2>My Profile Photo</h2>
          <div className="profile-photo">
            <img src="https://example.com/profile.jpg" alt="Profile" />
          </div>
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
  );
}

export default Profile;
