import "../index.css";
import { Link } from "react-router-dom";
import { Col } from 'react-bootstrap';
import "./index.css";
import MusicCard from "./MusicCard";

const SearchResultContainer = ({ name, id, imgLink, title }) => {
  return (
    <Col lg={3} md={6} xs={12} key={id}>
      {title === "Artists" ? (
        <Link className={"noUnderline"} key={id} to={`/search/artist/${id}`}>
          <MusicCard name={name} imgLink={imgLink}></MusicCard>
        </Link>
      ) : title === "Albums" ? (
        <Link className={"noUnderline"} key={id} to={`/search/album/${id}`}>
          <MusicCard name={name} imgLink={imgLink}></MusicCard>
        </Link>
      ) : (
        <MusicCard name={name} imgLink={imgLink}></MusicCard>
      )}
    </Col>
  );
}

export default SearchResultContainer;
