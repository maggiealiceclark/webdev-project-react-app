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
			await client.signup(credentials);
			setIsAuthenticated(true);
			localStorage.setItem('isAuthenticated', true);
			navigate("/profile");
		} catch (err) {
			setError(err.response.data.message);
		}
	};
	return (
		<div>
			<h1>Signup</h1>
			{error && <div>{error}</div>}
			<input
				value={credentials.username}
				onChange={(e) =>
					setCredentials({
						...credentials,
						username: e.target.value,
					})
				}
			/>
			<input
				value={credentials.password}
				onChange={(e) =>
					setCredentials({
						...credentials,
						password: e.target.value,
					})
				}
			/>
			<input type="checkbox" 
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
