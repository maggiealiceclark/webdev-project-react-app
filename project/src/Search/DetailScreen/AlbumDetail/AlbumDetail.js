import TableSong from "./Body/TableSong";
import {useParams} from "react-router-dom";
import AlbumHeader from "./Header/AlbumHeader";
import {useEffect, useState} from "react";
import {getALbumDetail, getToken} from "../../../APIService/service";

const AlbumDetail = () => {
  const {albumName, searchId} = useParams()
  const [resultAlbum, setResultAlbum] = useState(null)
  const getAlbumDetail = async () => {
    const res = await getToken()
    const albumdetail = await getALbumDetail(res, searchId)
    setResultAlbum(albumdetail)
  }

  useEffect(() => {
    getAlbumDetail()
  }, []);


  return (
    <div className={"container"}>
      {resultAlbum && (
        <>
          <AlbumHeader albumName={albumName}
                       albumImg={resultAlbum.images[0].url}>
          </AlbumHeader>
          <TableSong songData={resultAlbum.tracks.items}
                     title={"Tracks"}
                     albumImg={resultAlbum.images[0].url}></TableSong>
          {/*<pre>*/}
          {/*   {JSON.stringify(resultAlbum.images[0].url, null, 2)}*/}
          {/*</pre>*/}
        </>
      )}
    </div>
  )
}

export default AlbumDetail