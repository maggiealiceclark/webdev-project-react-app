import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Logo from "../images/albumcover.jpg";
import db from "./SearchData/Database/music.json";
import SearchResultContainer from "./SearchResultContainer";
import React from "react";

const ShowAllSearch = ({name, id}) => {
  const music = db;

  return (
    <div>
        <Row className="justify-content-center">
          {music.map((music) => (
            <SearchResultContainer/>
          ))}
        </Row>
    </div>

  );

}

export default ShowAllSearch;