import * as client from "../../account/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../images/logo.png";

function Header() {
	const savedAuthState = localStorage.getItem("isAuthenticated");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const signout = async () => {
		try {
			await client.signout();
			localStorage.removeItem("isAuthenticated"); // remove the item from localStorage
			window.location.reload();
		} catch (err) {
			setError(err.response.data.message);
		}
	};
	return (
		<Navbar expand="lg" className="bg-body-tertiary ">
			<Container fluid>
				<Navbar.Brand href="#/home">
					<img src={Logo} alt="Logo " style={{ height: "100px" }} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
						<Nav.Link href="#/home">Home</Nav.Link>
						<Nav.Link href="#/profile/">Profile</Nav.Link>
						<Nav.Link href="#/community">Community</Nav.Link>
						<Nav.Link href="#/search">Search</Nav.Link>
					</Nav>
					{savedAuthState && (
						<>
							<div className="d-flex">
								<Button href={"#/home"} onClick={signout}>Sign out</Button>
							</div>
						</>
					)}
					{!savedAuthState && (
						<>
							<div className="d-flex">
						<Button href={"#/signup"}>Sign up</Button>
						<Button href={"#/signin"}>Sign in</Button>
					</div>
						</>
					)}

					
					
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
