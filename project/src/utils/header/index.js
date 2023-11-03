import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../images/logo.png";

function Header() {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container fluid>
				<Navbar.Brand href="#/Home">
        <img src={Logo} alt="Logo " style={{height: "60px"}} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px"}} navbarScroll>
						<Nav.Link href="#/Home">
							Home
						</Nav.Link>
						<Nav.Link href="#/Profile">Profile</Nav.Link>
						<Nav.Link href="#/Community">Community</Nav.Link>
						<NavDropdown title="Settings" id="navbarScrollingDropdown">
							<NavDropdown.Item href="#action3">Edit Profile</NavDropdown.Item>
							<NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
						</NavDropdown>
		
					</Nav>
					<Form className="d-flex">
						<Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
