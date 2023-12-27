import background from "../../../../images/background.png";
import {Image} from "react-bootstrap";
import "./index.css"

const ArtistHeader = ({artistImg, followers, artistName}) => {
  return (
    <div className={"wd-artist-header"}>
      <img className={"wd-artist-background-img"} src={background}></img>
      <div>
        <Image className={"wd-artist-profile-img ms-0 m-3"}
               src={artistImg}></Image>
        <div className="wd-artist-name-container">
          <h1 className="wd-artist-name font">{artistName}</h1>
          <h5>Followers: {followers}</h5>
        </div>
      </div>
    </div>
  )
}

export default ArtistHeader