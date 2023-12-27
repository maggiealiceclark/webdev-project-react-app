import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import "./signin.css"; // Import your CSS file

function Signup(props) {
	const setIsAuthenticated = props.setIsAuthenticated;
	const [error, setError] = useState("");
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
		role: "USER",
		accountCreationDate: new Date(),
	});
	const navigate = useNavigate();

	const signup = async () => {
		try {
			const userData = await client.signup(credentials);
			setIsAuthenticated(true);
			localStorage.setItem("isAuthenticated", true);
			localStorage.setItem("accountCreationDate", userData.accountCreationDate);
			localStorage.setItem("user", credentials.username);
			window.location.reload();
			navigate("/profile");
		} catch (err) {
			setError("Username already exists or can not be blank. Please try again.");
		}
	};

	return (
		<div>
			<div className="wd-signin-container">
				<h1>Sign Up</h1>
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
				<div className="wd-checkbox-container">
					<input
						type="checkbox"
						id="admin"
						onClick={(e) =>
							setCredentials({
								...credentials,
								role: e.target.checked ? "ADMIN" : "USER",
							})
						}
					/>
					<label htmlFor="admin" className="wd-checkbox-label">
						Register as Admin
					</label>
				</div>
				<button onClick={signup} className="wd-button">
					Signup
				</button>
			</div>
			<div className="wd-already-a-member">
				Already a member? <a href="#/signin">Sign in</a>
			</div>
		</div>
	);
}

export default Signup;