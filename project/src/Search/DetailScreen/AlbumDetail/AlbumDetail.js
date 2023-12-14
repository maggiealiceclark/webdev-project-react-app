import TableSong from "./Body/TableSong";
import {useParams} from "react-router-dom";
import AlbumHeader from "./Header/AlbumHeader";
import {useEffect, useState} from "react";
import * as client from "../../../APIService/service";
import * as likesClient from "../../../likes/client";
import Container from "react-bootstrap/Container";
import * as userService from "../../../account/client";
import { FaHeart } from "react-icons/fa";


const AlbumDetail = () => {
  const {albumName, searchId: albumId} = useParams();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const fetchAlbumDetails = async () => {
    const token = await client.getToken();
    const result = await client.getAlbumDetails(token, albumId);
    setAlbumDetails(result);
  };

  const like = async () => {
    console.log('like initiated!');
    if (currentUser) {
      await likesClient.createUserLikesAlbum(currentUser._id, albumId);
    }
    else{
      console.log("no current user");
    }
  };

  const fetchAccount = async () => {
    const account = await userService.account();
    console.log("account: " + Object.keys(account));
    setCurrentUser(account);
    setProfileLoading(false);
};

   useEffect(() => {
    const fetchData = async () => {
      await fetchAccount();
      await fetchAlbumDetails();
    };

    fetchData();
   }, []);


  return (
    <Container>
      {albumDetails && (
        <>
          <AlbumHeader albumName={albumName}
                       albumImg={albumDetails.images[0].url}>
          </AlbumHeader>
          <button className={"wd-like-button"} onClick={like}>
              <FaHeart className={`wd-like-symbol ${isLiked ? 'wd-liked' : ''}`} />
            </button>
          <TableSong songData={albumDetails.tracks.items}
                     title={"Tracks"}
                     albumImg={albumDetails.images[0].url}></TableSong>
        </>
      )}
    </Container>
  )
}

export default AlbumDetail;