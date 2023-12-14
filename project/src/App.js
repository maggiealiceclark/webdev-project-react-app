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
import UserTable from "./admin/users";
import NoAccess from "./admin/noaccess";

const API_BASE = "http://localhost:4000/api";
const USERS_URL = `${API_BASE}/users`;

function App() {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(null);
	const [signoutStatus, setSignoutStatus] = useState(false);

	const onSignOut = () => {
		setSignoutStatus(true);
		setIsAuthenticated()
	};
	const fetchUsers = async () => {
		const response = await axios.get(USERS_URL);
		setUsers(response.data);
	};

	const fetchUser = async (username) => {
		const response = await axios.get(`${USERS_URL}/username/${username}`);
		return response.data;
	};

	const getUsername = async () => {
		const username = localStorage.getItem("user");
		const currentUser = await fetchUser(username);
		setUser(currentUser);
	};

	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		const savedAuthState = localStorage.getItem("isAuthenticated");
		return savedAuthState !== null ? JSON.parse(savedAuthState) : false;
	});

	useEffect(() => {
		fetchUsers();
		getUsername();
	}, []);

	return (
		<UserProvider>
			<HashRouter>
				<div className="wd-main-page">
				<Header setIsAuthenticated={setIsAuthenticated} onSignOut={onSignOut} />
					<Routes>
						{!isAuthenticated && (
							<>
							<Route path="/signin" element={<Navigate to="/signin" />} />
							<Route path="/signup" element={<Navigate to="/signup" />} />
							<Route path="/search/*" element={<Navigate to="/signin" />} />
							<Route path="/community/" element={<Navigate to="/signin" />} />
							<Route path="/profile" element={<Navigate to="/signin" />} />
							<Route path="/editprofile" element={<Navigate to="/signin" />} />
							<Route path="/admin" element={<Navigate to="/noaccess" />} />
							</>
						)}
						{isAuthenticated && (
							<>
							<Route path="Search" element={<Search />} />
							<Route path="search/Album/:albumName/:albumId/*" element={<AlbumDetail />} />
							<Route path="search/:artistName/:artistId" element={<ArtistDetail />} />
							<Route path="search/ShowAll/:title/*" element={<ShowAllSearch />} />

							<Route path="/editprofile" element={<EditProfile />} />
							<Route path="/profile" element={<Profile />} />
							{/* Community stuff */}
							<Route path="/community" element={<MessageBoard users={users} />} />
							{/* Redirect to Home if already signed in or signed out */}
							<Route path="signup" element={<Navigate to="/home" />} />
							<Route path="signin" element={<Navigate to="/home" />} />
							{/* Admin Panel Stuff */}
							{user && user.role === "USER" && <Route path="/admin" element={<Navigate to="/noaccess" />} />}
							{user && user.role === "ADMIN" && <Route path="/admin" element={<UserTable />} />}
							</>
						)}
						<Route path="/" element={<Navigate to="Home" />} />
						<Route path="/home" element={<Home signoutStatus={signoutStatus} />} />
						<Route path="/profile/:id" element={<Profile />} />
						<Route path="/noaccess" element={<NoAccess />} />
					</Routes>
				</div>
			</HashRouter>
		</UserProvider>
	);
}

export default App;
