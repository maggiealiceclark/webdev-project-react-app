import {Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import SearchResultContainer from "./SearchResultContainer";
import React from "react";

const ShowAllSearch = () => {
  const {title} = useParams()

  return (
    <div className={"container"}>
      <h1>Show All</h1>
      {/*<h2 className={"ms-0 m-3"}>{title}</h2>*/}
      {/*  <Row className="justify-content-center">*/}
      {/*    {music.map((music) => (*/}
      {/*      <SearchResultContainer/>*/}
      {/*    ))}*/}
      {/*  </Row>*/}
    </div>

  );

}

export default ShowAllSearch;