import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup(props) {
	const setIsAuthenticated = props.setIsAuthenticated;
	const [error, setError] = useState("");
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
		role: "USER",
	});
	const navigate = useNavigate();
	const signup = async () => {
		try {
			const userData = await client.signup(credentials);
			setIsAuthenticated(true);
			localStorage.setItem('isAuthenticated', true);
			localStorage.setItem("accountCreationDate", userData.accountCreationDate);
			localStorage.setItem("isAuthenticated", true);
			localStorage.setItem("user", credentials.username);
			window.location.reload();

			navigate("/profile");
		} catch (err) {
			setError("Username already exists. Please try again");
		}
	};
	return (
		<div>
			<h1>Signup</h1>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<input
				value={credentials.username}
				onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
				placeholder="Username"
			/>
			<input
				type="password"
				value={credentials.password}
				onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
				placeholder="Password"
			/>
			<input
				type="checkbox"
				onClick={(e) =>
					setCredentials({
						...credentials,
						role: "ADMIN",
					})
				}
			/>

			<button onClick={signup}>Signup</button>
		</div>
	);
}
export default Signup;
