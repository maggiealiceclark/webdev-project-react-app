import "./index.css"
import {Link} from "react-router-dom";
import Logo from "../images/albumcover.jpg";
import { Card, Container, Row, Col } from 'react-bootstrap';

const SearchResultContainer = ({name, id}) => {
  return (
      <Col lg={3} md={6} xs={12} key={id}>
        <Link key={id} to={`/Search/${id}`}>
          <Card className="mb-4">
            <Card.Img variant="top" src={Logo} alt={`Cover for ${name}`} />
            <Card.Body>
            <Card.Title>{"Addele"}</Card.Title>
            <Card.Text>{"Some quick example text"}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
  );
}

export default SearchResultContainer
