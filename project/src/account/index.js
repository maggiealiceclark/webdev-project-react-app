import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap"; // Import Navbar components
import Logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profile() {
	const { id } = useParams();
	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const findUserById = async (id) => {
		const user = await client.findUserById(id);
		setProfile(user);
		setIsLoading(false);
	};

	const fetchAccount = async () => {
		const account = await client.account();
		setProfile(account);
		setIsLoading(false);
	};

	useEffect(() => {
		if (id) {
			findUserById(id);
		} else {
			fetchAccount();
		}
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Navbar style={{ backgroundColor: "#2281a7", fontFamily: "system-ui" }} variant="dark" expand="lg">
				<Container>
					<div className="profile-pto">
						<img
							class="rounded-circle border"
							style={{ height: "200px", padding: "10px", margin: "10px" }}
							src={Logo}
							alt="Logo "
						/>
					</div>
					<Navbar.Brand className="mx-auto font-weight-bold" style={{ padding: "5px" }}>
						{profile.username}
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link as={Link} to="/EditProfile">
								Edit My Profile
							</Nav.Link>
							<FontAwesomeIcon icon="fas fa-cogs" style={{ color: "#65cfd4" }} />
							<Nav.Link as={Link} to="/Home">
								That guy has been listening since {profile.dob}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<div className="container" style={{ backgroundColor: "#65cfd4", margin: "50px", marginLeft: "100px" }}>
				<div className="row" style={{ backgroundColor: "#65cfd4" }}>

					<div className="col-md-4" style={{ backgroundColor: "#65cfd4" }}>
						<div>
							<h2 class="display-5" style={{ paddingTop: "20px", fontFamily: "system-ui", color: "white" }}>
								My Most Recent Tracks
							</h2>
						</div>
					</div>
					<div className="col-md-4" style={{ backgroundColor: "#65cfd4", fontFamily: "system-ui", color: "white" }}>
						<div className="profile-info">
							<h2 class="display-6" style={{ paddingTop: "20px" }}>
								My Name
							</h2>
							<p>Email: myemail.com</p>
							<a href="https://example.com/johndoe" target="_blank" rel="noopener noreferrer">
								Social Media Link
							</a>
						</div>
					</div>

					<div className="col-md-4" style={{ backgroundColor: "#65cfd4", fontFamily: "system-ui", color: "white" }}>
						<div>
							<h2 class="display-5" style={{ paddingTop: "20px" }}>
								My Top Artists
							</h2>
						</div>
						<div className="list">
							<h2 class="display-6">My List of Friends, Imported From Somewhere..</h2>
							<ul>
								<li>Item 1</li>
								<li>Item 2</li>
								<li>Item 3</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
