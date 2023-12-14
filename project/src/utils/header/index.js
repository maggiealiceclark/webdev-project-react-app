import * as client from "../../account/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../images/logo.png";
import axios from "axios";
import { useEffect } from "react";
import "./index.css";

const API_BASE = "http://localhost:4000/api";
const USERS_URL = `${API_BASE}/users`;

function Header({ setIsAuthenticated, onSignOut }) {
	const [user, setUser] = useState(null);
	const savedAuthState = localStorage.getItem("isAuthenticated");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const username = localStorage.getItem("user");

	const signout = async () => {
		try {
			await client.signout();
			localStorage.setItem("isAuthenticated", false);
			localStorage.removeItem("user");
			localStorage.removeItem("username");
			setIsAuthenticated(false);
			onSignOut();
			navigate("/home"); // Redirect to the home page after signing out
		} catch (err) {
			setError(err.response.data.message);
		}
	};

	const fetchUser = async (username) => {
		const response = await axios.get(`${USERS_URL}/username/${username}`);
		return response.data;
	};

	const getUsername = async () => {
		const username = localStorage.getItem("user");
		const currentUser = await fetchUser(username);
		setUser(currentUser);
	};

	useEffect(() => {
		getUsername();
	}, []);

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container fluid>
				<Navbar.Brand href="#/home">
					<img src={Logo} alt="Logo" style={{ height: "100px" }} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
						<Nav.Link href="#/home">Home</Nav.Link>
						<Nav.Link href="#/profile/">Profile</Nav.Link>
						<Nav.Link href="#/community">Community</Nav.Link>
						<Nav.Link href="#/search">Search</Nav.Link>
					</Nav>
					<div className="d-flex">
						{username ? (
							user && user.role === "ADMIN" ? (
								<>
									<div className="wd-header-buttons">
										<button className="wd-button" onClick={() => navigate("/admin")}>
											{" "}
											Admin
										</button>
										<button className="wd-button" onClick={signout}>
											Sign out
										</button>
									</div>
								</>
							) : (
								<>
									<button className="wd-button" onClick={signout}>
										Sign out
									</button>
								</>
							)
						) : (
							<>
								<div className="wd-header-buttons">
									<button className="wd-button" onClick={() => navigate("/signup")}>
										Sign up
									</button>
									<button className="wd-button" onClick={() => navigate("/signin")}>
										Sign in
									</button>
								</div>
							</>
						)}
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
