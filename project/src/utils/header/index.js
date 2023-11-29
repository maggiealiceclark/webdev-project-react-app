import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../images/final.fm logo.png";

function Header() {
	return (
		<Navbar expand="lg" className="bg-body-tertiary ">
			<Container fluid>
				<Navbar.Brand href="#/Home">
					<img src={Logo} alt="Logo " style={{ height: "100px" }} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
						<Nav.Link href="#/Home">Home</Nav.Link>
						<Nav.Link href="#/Profile">Profile</Nav.Link>
						<Nav.Link href="#/Community">Community</Nav.Link>
						<Nav.Link href={"#/Search"}>Search</Nav.Link>
					</Nav>
					<div className="d-flex">
						<Button href={"#/signup"}>Sign up</Button>
						<Button href={"#/signin"}>Sign in</Button>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
