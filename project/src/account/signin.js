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
			navigate("/profile");
		} catch (err) {
			setError(err.response.data.message);
		}
	};
	return (
		<div>
			<h1>Sign in</h1>
			{error && <div>{error}</div>}
			<input
				value={credentials.username}
				onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
			/>
			<input
				value={credentials.password}
				onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
			/>
			<button onClick={signin}> Sign in </button>
		</div>
	);
}
export default Signin;
