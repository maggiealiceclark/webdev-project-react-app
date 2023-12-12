import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
			<h1>Sign in</h1>
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
			<button onClick={signin}>Sign in</button>
		</div>
	);
}

export default Signin;
