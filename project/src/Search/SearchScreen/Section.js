import {Row} from "react-bootstrap";
import SearchResultContainer from "./SearchResultContainer";
import React from "react";
import {Link} from "react-router-dom";
import error_image from "../../images/cant-find-image.png";

const Section = ({title, result}) => {
  return (
    <div>
      <div className={"d-flex justify-content-between m-2"}>
        <h2 className={"font"}>{title}</h2>
      </div>
      <Row className="justify-content-center">
        {result.map((music) => (
          title === "Songs" ? (
            <SearchResultContainer name={music.album.name} id={music.id}
                                   imgLink={music.album.images?.[0]?.url || error_image} title={title}/>
          ) : (
            <SearchResultContainer name={music.name} id={music.id}
                                   imgLink={music.images?.[0]?.url || error_image} title={title}/>
          )
        ))}
      </Row>
      <hr/>
    </div>
  )
}

export default Section;