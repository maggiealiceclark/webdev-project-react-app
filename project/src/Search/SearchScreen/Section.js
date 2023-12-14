import { Row } from "react-bootstrap";
import SearchResultContainer from "./SearchResultContainer";
import React from "react";
import { Link } from "react-router-dom";
import error_image from "../../images/cant-find-image.png";

const Section = ({ title, result, onArtistClick }) => {
  return (
    <div>
      <div className={"d-flex justify-content-between m-2"}>
        <h2 className={"font"}>{title}</h2>
        {title === "Artists" && (
          <Link key={"1"} to={`/Search/ShowAll/${title}`} className={"mt-2"}>
            Show All
          </Link>
        )}
      </div>
      <Row className="justify-content-center">
        {result.map((music) => (
          <SearchResultContainer
            key={music.id}
            name={title === "Songs" ? music.album.name : music.name}
            id={music.id}
            imgLink={
              title === "Songs"
                ? music.album.images?.[0]?.url || error_image
                : music.images?.[0]?.url || error_image
            }
            title={title}
            onClick={() => title === "Artists" && onArtistClick(music.name, music.id)}
          />
        ))}
      </Row>
      <hr />
    </div>
  );
};

export default Section;
