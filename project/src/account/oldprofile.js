import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Account() {
	const { id } = useParams();
	const [account, setAccount] = useState(null);
	const findUserById = async (id) => {
		const user = await client.findUserById(id);
		setAccount(user);
	};
	const navigate = useNavigate();
	const fetchAccount = async () => {
		const account = await client.account();
		setAccount(account);
	};
	const save = async () => {
		await client.updateUser(account);
	};
	const signout = async () => {
		await client.signout();
		navigate("/signin");
	};
	useEffect(() => {
		if (id) {
			findUserById(id);
		} else {
			fetchAccount();
		}
	}, []);
	return (
		<div className="w-50">
			<h1>Account</h1>
			{!account && (
				<div>
					<Link to={"/signin"}>
						<button className="btn btn-primary">Signin</button>
					</Link>
					<Link to={"/signup"}>
						<button className="btn btn-primary">Signup</button>
					</Link>
				</div>
			)}
			{account && (
				<div>
					<input
						value={account.password}
						placeholder="Password"
						onChange={(e) => setAccount({ ...account, password: e.target.value })}
					/>
					<input
						value={account.firstName}
						placeholder="First Name"
						onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
					/>
					<input
						value={account.lastName}
						placeholder="Last Name"
						onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
					/>
					<input
						value={account.dob}
						placeholder="Date of Birth"
						onChange={(e) => setAccount({ ...account, dob: e.target.value })}
					/>
					<input
						value={account.email}
						placeholder="Email"
						onChange={(e) => setAccount({ ...account, email: e.target.value })}
					/>
					<select onChange={(e) => setAccount({ ...account, role: e.target.value })}>
						<option value="USER">User</option>
						<option value="ADMIN">Admin</option>
					</select>
					<button onClick={save}>Save</button>
					<button onClick={signout}>Sign out</button>

					<Link to="/Kanbas/admin/users" className="btn btn-warning w-100">
						Users
					</Link>
				</div>
			)}
		</div>
	);
}
export default Account;
