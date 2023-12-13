import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css"; // Import your CSS file

function Signin(props) {
	const setIsAuthenticated = props.setIsAuthenticated;
	const [error, setError] = useState("");
	const [credentials, setCredentials] = useState({ username: "", password: "" });
	const navigate = useNavigate();

	const signin = async () => {
		try {
			await client.signin(credentials);
			setIsAuthenticated(true);
			localStorage.setItem("isAuthenticated", true);
			localStorage.setItem("user", credentials.username);
			window.location.reload();
			navigate("/home");
		} catch (err) {
			setError("Invalid credentials. Please check your username and password.");
		}
	};

	return (
		<div>
			<div className="wd-signin-container">
				<h1>Sign In</h1>
				{error && <div className="wd-error-message">{error}</div>}
				<input
					value={credentials.username}
					onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
					placeholder="Username"
					className="wd-input-field"
				/>
				<input
					type="password"
					value={credentials.password}
					onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
					placeholder="Password"
					className="wd-input-field"
				/>
				<button onClick={signin} className="wd-button">
					Sign in
				</button>
			</div>
			<div className="wd-not-a-member">
				Not a member? <a href="#/signup">Sign up</a>
			</div>
		</div>
	);
}

export default Signin;
