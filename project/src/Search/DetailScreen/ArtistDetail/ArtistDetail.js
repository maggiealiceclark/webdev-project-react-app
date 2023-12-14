import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getArtistDetail, getToken, getTopTrack} from "../../../APIService/service";
import "./index.css"
import TableSong from "../AlbumDetail/Body/TableSong";
import ArtistHeader from "./Header/ArtistHeader";

const ArtistDetail = () => {
  const {artistId, artistName} = useParams()
  console.log("Artist ID:", artistId);
  console.log(artistId, artistName)
  const [resultTopSong, setResultTopSong] = useState(null)
  const [resultArtist, setResultArtist] = useState(null)

  useEffect(() => {
    const getTopSongs = async () => {
      try {
        if (!artistId) {
          throw new Error("Artist ID is undefined");
        }
  
        const res = await getToken();
        const topsong = await getTopTrack(res, artistId);
        const artist = await getArtistDetail(res, artistId);
        setResultTopSong(topsong);
        setResultArtist(artist);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };
  
    getTopSongs();
  }, [artistId]);


  return (
    <div className={"container"}>
      {resultArtist && (
        <>
          <ArtistHeader artistName={artistName}
                        artistImg={resultArtist.images[0].url}
                        followers={resultArtist.followers.total}>
          </ArtistHeader>
          <div className={"wd-body"}>
            <TableSong songData={resultTopSong} title={"Top Song"}></TableSong>
          </div>
        </>)}

    </div>
  )
}

export default ArtistDetail