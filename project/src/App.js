import "./App.css";
import "./styles.css";
import { HashRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import Profile from "./account";
import Header from "./utils/header";
import Home from "./home";
import MessageBoard from "./Community";
import Signin from "./account/signin";
import Signup from "./account/signup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import ShowAllSearch from "./Search/SearchScreen/ShowAllSearch";
import AlbumDetail from "./Search/DetailScreen/AlbumDetail/AlbumDetail";
import EditProfile from "./profile/editProfile";
import ArtistDetail from "./Search/DetailScreen/ArtistDetail/ArtistDetail";
import { UserProvider } from "./account/UserContext";

function App() {
	const [users, setUsers] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		const savedAuthState = localStorage.getItem("isAuthenticated");
		return savedAuthState !== null ? JSON.parse(savedAuthState) : false;
	});

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
		<UserProvider>
			<HashRouter>
				<div className="wd-main-page">
					<Header />
					<Routes>
						{!isAuthenticated && (
							<>
								<Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />}></Route>
								<Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />}></Route>
								<Route path="/search/*" element={<Navigate to="/signin" />}></Route>
								<Route path="/community/" element={<Navigate to="/signin" />}></Route>
								<Route path="/editprofile" element={<Navigate to="/signin" />}></Route>
							</>
						)}
						{isAuthenticated && (
							<>
								<Route path="Search" element={<Search />}></Route>
								<Route path={"search/Album/:albumName/:searchId/*"} element={<AlbumDetail />}></Route>
								<Route path={"search/ShowAll/:title/*"} element={<ShowAllSearch />}></Route>
								<Route path={"search/:artistName/:id"} element={<ArtistDetail />}></Route>
								<Route path="/editprofile" element={<EditProfile />}></Route>
								<Route path="/community" element={<MessageBoard users={users} />}></Route>
								<Route path="signin" element={<Navigate to="Home" />}></Route>{" "}
								{/* Redirect to Home if already signed in or signed out */}
								<Route path="signup" element={<Navigate to="Home" />}></Route>,
							</>
						)}
						<Route path="/" element={<Navigate to="Home" />}></Route>
						<Route path="/home" element={<Home />}></Route>
						<Route path="/profile" element={<Profile />}></Route>
						<Route path="/profile/:id" element={<Profile />} />
					</Routes>
				</div>
			</HashRouter>
		</UserProvider>
	);
}

export default App;
