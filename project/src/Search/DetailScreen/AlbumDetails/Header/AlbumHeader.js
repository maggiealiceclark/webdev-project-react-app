import background from "../../../../images/background.png";
import Logo from "../../../../images/albumcover.jpg";
import "./index.css"

const AlbumHeader = ({albumName, albumImg}) => {
  return (
    <div className={"wd-album-header"}>
      <img className={"wd-album-background-img"} src={background}></img>
      <div>
        <img className={"wd-album-profile-img"} src={albumImg}/>
        <div className={"wd-album-name-container"}>
          <h1 className={"wd-album-name font"}>{albumName}</h1>
        </div>
      </div>
    </div>
  )
}

export default AlbumHeader