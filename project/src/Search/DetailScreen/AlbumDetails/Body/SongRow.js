import Logo from "../../../../images/albumcover.jpg";

const SongRow = ({imgSong, artistName, songName}) => {
  const artistNames = artistName.map((song) => song.name).join(', ');

  return (
    <div className={"wd-songRow d-flex"}>
      <img className={"wd-songImg me-3"} src={imgSong} alt={`Cover for`}/>
      <div className={"d-flex flex-column justify-content-center"}>
        <p className={"m-0 wd-song-title"}>{songName}</p>
        <p className={"m-0 wd-artist-title"}>
          {artistNames}
        </p>
      </div>

    </div>
  )
}

export default SongRow;