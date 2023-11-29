
import {Row} from "react-bootstrap";
import SearchResultContainer from "./SearchResultContainer";
import React from "react";
import db from "./SearchData/Database/music.json";
import {Link} from "react-router-dom";

const Section = ({index}) => {
  // const music = db
  const music = db.slice(0, 4);
  return(
    <div>
      <div className={"d-flex justify-content-between m-2"}>
        <h2>{index}</h2>
        <Link key={"1"} to={"/Search/ShowAll"} className={"mt-2"}>Show All</Link>
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