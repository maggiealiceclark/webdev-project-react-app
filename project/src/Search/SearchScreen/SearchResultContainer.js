import "../index.css"
import {Link} from "react-router-dom";
import {Col} from 'react-bootstrap';

import "./index.css"
import CardMusic from "./CardMusic";

const SearchResultContainer = ({name, id, imgLink, title}) => {
  return (
    <Col lg={3} md={6} xs={12} key={id}>
      {title === "Artists" ? (
        <Link className={"noUnderline"} key={id} to={`/Search/${name}/${id}`}>
          <CardMusic name={name} imgLink={imgLink}></CardMusic>
        </Link>
      ) : (
        <Link className={"noUnderline"} key={id} to={`/Search/Album/${name}/${id}`}>
          <CardMusic name={name} imgLink={imgLink}></CardMusic>
        </Link>
      )}
    </Col>
  );
}

export default SearchResultContainer
