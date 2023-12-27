import "./index.css"
import SongRow from "./SongRow";

const TableSong = ({songData, title, albumImg}) => {
  return (
    <>
      <h3 className={"font topSong-fontSize"}>{title}</h3>
      <div className={"wd-table"}>
        {songData.map((song, index) => (
          title === "Top Song" ? (
              <SongRow key={index}
                       songName={song.name}
                       imgSong={songData[0].album.images[0].url}
                       artistName={song.artists}/>
            ) :
            (
              <SongRow key={index}
                       songName={song.name}
                       imgSong={albumImg}
                       artistName={song.artists}
              />
            )
        ))}
      </div>
    </>
  )
}

export default TableSong