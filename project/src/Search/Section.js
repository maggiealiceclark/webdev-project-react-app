
import {Row} from "react-bootstrap";
import SearchResultContainer from "./SearchResultContainer";
import React from "react";
import db from "./SearchData/Database/music.json";
import {Link} from "react-router-dom";

const Section = ({index}) => {
  const music = db
  return(
    <div>
      <div>
        <h2>{index}</h2>
        <Link key={"1"} to={"/Search/ShowAll"}>Show All</Link>
      </div>
      <Row className="justify-content-center">
        {music.map((music) => (
          <SearchResultContainer name={music.name} id={music.id} />
        ))}
      </Row>
      <hr/>
    </div>
  )
}

export default Section