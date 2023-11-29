import Logo from "../../images/albumcover.jpg";
const SongRow = () => {
  return(
    <div className={"d-flex"}>
      <img className={"wd-songImg me-3"} src={Logo} alt={`Cover for`}/>
      <div>
        <p className={"m-0"}>Love Story</p>
        <p className={"m-0"}>Taylor Swift</p>
      </div>
    </div>
  )
}

export default SongRow