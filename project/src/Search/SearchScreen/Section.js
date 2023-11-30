import {Row} from "react-bootstrap";
import SearchResultContainer from "./SearchResultContainer";
import React from "react";
import {Link} from "react-router-dom";
import error_image from "../../images/cant-find-image.png"

const Section = ({index, result}) => {
  return (
    <div>
      <div className={"d-flex justify-content-between m-2"}>
        <h2>{index}</h2>
        <Link key={"1"} to={`/Search/ShowAll/${index}`} className={"mt-2"}>Show All</Link>
      </div>
      <Row className="justify-content-center">
        {result.map((music) => (
          index === "Songs" ? (
            <SearchResultContainer name={music.album.name} id={music.id}
                                   imgLink={music.album.images?.[0]?.url || error_image}/>
          ) : (
            <SearchResultContainer name={music.name} id={music.id} imgLink={music.images?.[0]?.url || error_image}/>
          )
        ))}
      </Row>
      <hr/>
    </div>
  )
}

export default Section