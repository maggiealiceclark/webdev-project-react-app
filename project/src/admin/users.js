import "./index.css";
import * as client from "../account/client";
import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPlusCircleFill, BsTrash3Fill, BsPencil, BsPen } from "react-icons/bs";
import { Link } from "react-router-dom";

function UserTable() {
	const [users, setUsers] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [updatedUser, setUpdatedUser] = useState({ username: "", password: "", role: "USER" });

	const deleteUser = async (updatedUser) => {
		try {
			await client.deleteUser(updatedUser);
			setUsers(users.filter((u) => u._id !== updatedUser._id));
		} catch (err) {
			console.log(err);
		}
	};
	const selectUser = async (updatedUser) => {
		try {
			const u = await client.findUserById(updatedUser._id);
			setUpdatedUser(u);
		} catch (err) {
			console.log(err);
		}
	};
	const updateUser = async () => {
		try {
			setIsEditing(false);
			const status = await client.updateUser(updatedUser);
			setUsers(users.map((u) => (u._id === updatedUser._id ? updatedUser : u)));
		} catch (err) {
			console.log(err);
		}
	};

	const fetchUsers = async () => {
		const users = await client.findAllUsers();
		setUsers(users);
	};
	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<div className="wd-user-table">
			<h1>User List</h1>
			<table className="table">
				{isEditing && (
					<thead>
						<tr>
							<th>Username</th>
							<th>Password</th>
							<th>First Name</th>
							<th>Last Name</th>
						</tr>
						<tr>
							<td>
								<input
									value={updatedUser.username}
									onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
								/>
							</td>
							<td>
								<input
									value={updatedUser.password}
									onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
								/>
							</td>
							<td>
								<input
									value={updatedUser.firstName}
									onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
								/>
							</td>
							<td>
								<input
									value={updatedUser.lastName}
									onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
								/>
							</td>
							<td>
								<select
									value={updatedUser.role}
									onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
								>
									<option value="USER">User</option>
									<option value="ADMIN">Admin</option>
								</select>
							</td>
							<td className="text-nowrap">
								<BsFillCheckCircleFill onClick={updateUser} className="me-2 text-success fs-1 text" />
							</td>
						</tr>
					</thead>
				)}
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<td>
								<Link to={`/profile/${user._id}`}>{user.username}</Link>
							</td>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
							<td className="text-nowrap">
								<button className="btn btn-danger me-2">
									<BsTrash3Fill onClick={() => deleteUser(user)} />
								</button>
								<button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>
									<BsPencil onClick={() => selectUser(user)} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default UserTable;
