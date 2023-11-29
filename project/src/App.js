import "./App.css";
import "./styles.css";
import { HashRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import Profile from "./profile";
import Header from "./utils/header";
import Home from "./home";
import MessageBoard from "./Community";
import Signin from "./account/signin";
import Signup from "./account/signup"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import ShowAllSearch from "./Search/ShowAllSearch";
import AlbumDetail from "./Search/AlbumDetail";

function App() {
	const [users, setUsers] = useState([]);

	const API_BASE = "http://localhost:4000/api";
	const USERS_URL = `${API_BASE}/users`;

	const fetchUsers = async () => {
		const response = await axios.get(USERS_URL);
		setUsers(response.data);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<HashRouter>
			<div className="wd-main-page">
				<Header />
				<Routes>
					<Route path="/" element={<Navigate to="Home" />}></Route>
					<Route path="Home" element={<Home />}></Route>
					<Route path="Community" element={<MessageBoard users={users} />}></Route>
					<Route path="profile" element={<Profile />}></Route>
					<Route path="signin" element={<Signin />}></Route>
					<Route path="signup" element={<Signup />}></Route>
					<Route path="Search" element={<Search />}></Route>
					<Route path={"Search/:searchId/*"} element={<AlbumDetail />}></Route>
					<Route path={"Search/ShowAll/*"} element={<ShowAllSearch />}></Route>
				</Routes>
			</div>
		</HashRouter>
	);
}

export default App;
