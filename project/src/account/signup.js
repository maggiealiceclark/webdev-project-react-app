import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
	const [credentials, setCredentials] = useState({ username: "", password: "" });
	const navigate = useNavigate();
	const signin = async () => {
		await client.signin(credentials);
		navigate("/profile");
	};
	return (
		<div>
			<h1>Sign up</h1>
			<input
				value={credentials.username}
				onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
			/>
			<input
				value={credentials.password}
				onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
			/>
			<button onClick={signin}> Sign up </button>
		</div>
	);
}

export default Signup;
