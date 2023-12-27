import React from "react";
import {Card} from 'react-bootstrap';

const CardMusic = ({name, imgLink}) => {

  const maxWords = 4;
  const artistName = name.split(' ');
  const artist_Name = artistName.length > maxWords
    ? `${artistName.slice(0, maxWords).join(' ')} ...`
    : name;

  return (
    <Card className="mb-4 wd-card">
      <Card.Img className={"wd-card-img"} variant="top" src={imgLink} alt={`Cover for ${name}`}
      />
      <Card.Body>
        <Card.Title className={"font"}>{artist_Name}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default CardMusic