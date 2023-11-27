import {Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import Logo from "../images/albumcover.jpg";

const ShowAllSearch = ({name, id}) => {
  return (
    <Col lg={3} md={6} xs={12} key={id}>
      <Link key={id} to={`/Search/${id}`}>
        <Card className="mb-4">
          <Card.Img variant="top" src={Logo} alt={`Cover for ${name}`} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{name}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );

}

export default ShowAllSearch;