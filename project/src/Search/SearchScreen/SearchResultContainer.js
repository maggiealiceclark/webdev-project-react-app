import "../index.css"
import {Link} from "react-router-dom";
import {Card, Col} from 'react-bootstrap';

const SearchResultContainer = ({name, id, imgLink}) => {
  return (
    <Col lg={3} md={6} xs={12} key={id}>
      <Link key={id} to={`/Search/${id}`}>
        <Card className="mb-4">
          <Card.Img variant="top" src={imgLink} alt={`Cover for ${name}`}
                    style={{maxHeight: '200px', maxWidth: '100%', objectFit: 'cover'}}/>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{"Some quick example text"}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default SearchResultContainer
