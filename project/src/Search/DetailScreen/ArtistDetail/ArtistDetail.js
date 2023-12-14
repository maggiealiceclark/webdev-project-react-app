import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getArtistDetail, getToken, getTopTrack} from "../../../APIService/service";
import "./index.css"
import TableSong from "../AlbumDetail/Body/TableSong";
import ArtistHeader from "./Header/ArtistHeader";

const ArtistDetail = () => {
  const {artistName, artistId} = useParams();
  console.log(artistId, artistName);
  const [resultTopSong, setResultTopSong] = useState(null);
  const [resultArtist, setResultArtist] = useState(null);

  useEffect(() => {
    const getTopSongs = async () => {
      const res = await getToken();
      const topsong = await getTopTrack(res, artistId);
      const artist = await getArtistDetail(res, artistId);
      setResultTopSong(topsong);
      setResultArtist(artist)
    }
    getTopSongs();
  }, []);


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

export default ArtistDetail;