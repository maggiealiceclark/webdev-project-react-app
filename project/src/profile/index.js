import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Container, Nav, Button } from "react-bootstrap";
import Logo from "../images/logo.png";
import Carousel from "react-bootstrap/Carousel";
import * as accountClient from "../account/client";
import * as likeClient from "../likes/client";
import * as followsClient from "../follows/client";
import * as service from "../APIService/service";
import "./index.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [accessToken, setAccessToken] = useState("");
  const [idParam] = useSearchParams();
  const { id } = useParams();
  const [profileFromParams, setProfileFromParams] = useState(false);
  const [profile, setProfile] = useState(null);
  const [accountVisitor, setAccountVisitor] = useState(null);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAccount = async () => {
    const user = await accountClient.account();
    setProfile(user);
    await fetchLikedAlbums(user._id);
    await fetchFollowing(user._id);
  };

  const fetchUser = async (id) => {
    const user = await accountClient.findUserById(id);
    setProfile(user);
    await fetchLikedAlbums(user._id);
    await fetchFollowing(user._id);
    const visitor = await accountClient.account();
    console.log("visitor: " + visitor);
    setAccountVisitor(visitor);
    setProfileFromParams(true);
  };

  const fetchFollowing = async (userId) => {
    const following = await followsClient.findUsersFollowedByUser(userId);
    const followingData = await Promise.all(
      following.map(async (follow) => {
        const user = await accountClient.findUserById(follow.followed);
        return user;
      })
    );
    console.log(followingData);
    setFollowing(followingData);
  };

  const follow = async () => {
    followsClient.createUserFollowsUser(accountVisitor._id, profile._id);
  }

  const fetchLikedAlbums = async (userId) => {
    const likes = await likeClient.findAlbumsUserLikes(userId);

    const albumsData = await Promise.all(
      likes.map(async (like) => {
        const album = await service.getAlbumDetails(accessToken, like.albumId);
        return album;
      })
    );
    setLikedAlbums(albumsData);
    setIsLoading(false);
  };

  const goToLikedAlbum = (albumId) => {
    navigate(`/search/album/${albumId}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      const token = await service.getToken();
      console.log(token);
      setAccessToken(token);

      if (id) {
        fetchUser(id);
      } else {
        fetchAccount();
      }
    };


    fetchData();
  }, [id]);

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
            {profileFromParams ? (         
               <Button
               onClick={follow}
            variant="light">Follow</Button>) : (

              <Button
              as={Link}
              to={`/EditProfile?id=${profile._id}`}
              variant="light"
              >Edit My Profile</Button>
            )}


      </Container>

      <div className="container carousel-container">
        <div className="row" style={{ backgroundColor: "#65cfd4" }}>
          <div className="col-md-4" style={{ backgroundColor: "#65cfd4" }}>
            <div>
              <h2 className="display-5">Liked Albums</h2>
              <Carousel>
                {likedAlbums.map((album) => (
                  <Carousel.Item key={album.id} 
                  onClick={() => goToLikedAlbum(album.id)} >
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
            className="col-md-4"
            style={{
              backgroundColor: "#65cfd4",
              fontFamily: "system-ui",
              color: "white",
            }}
          >
            {/* This column is empty, add content as needed */}
          </div>

          <div
            className="col-md-4"
            style={{
              backgroundColor: "#65cfd4",
              fontFamily: "system-ui",
              color: "white",
            }}
          >
            <div>
              {/* This is just a placeholder, add content as needed */}
            </div>
            <div className="list">
              <h2 className="display-5">Following</h2>
              <ul>
              {following.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
