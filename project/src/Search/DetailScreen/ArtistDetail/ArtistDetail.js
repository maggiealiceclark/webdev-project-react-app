import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getArtistDetail, getToken, getTopTrack} from "../../../APIService/service";
import "./index.css"
import TableSong from "../AlbumDetail/Body/TableSong";
import ArtistHeader from "./Header/ArtistHeader";

const ArtistDetail = () => {
  const {artistId, artistName} = useParams()
  console.log("Artist ID:", artistId);
console.log("Artist Name:", artistName);
  const [resultTopSong, setResultTopSong] = useState(null)
  const [resultArtist, setResultArtist] = useState(null)


  useEffect(() => {
    console.log("Effect - Artist ID:", artistId);

    const getTopSongs = async () => {
      try {
        if (!artistId) {
          throw new Error("Artist ID is undefined");
        }

        // Rest of the code for fetching top tracks...
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    getTopSongs();
  }, [artistId]);


  return (
    <div className={"container"}>
      {resultArtist ? (
        <>
          <ArtistHeader
            artistName={artistName}
            artistImg={resultArtist.images[0].url}
            followers={resultArtist.followers.total}
          ></ArtistHeader>
          <div className={"wd-body"}>
            <TableSong songData={resultTopSong} title={"Top Song"}></TableSong>
          </div>
        </>
      ) : (
        <div>Error fetching artist details. Please try again later.</div>
      )}
    </div>
  );

  
}

export default ArtistDetail