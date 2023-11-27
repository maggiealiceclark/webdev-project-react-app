import "./App.css";
import "./styles.css";
import { HashRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import Profile from "./profile";
import Header from "./utils/header";
import Home from "./home";
import signIn from "./signIn";
import MessageBoard from "./Community";
import Register from "./signIn/register";
import Search from "./Search";
import ShowAllSearch from "./Search/ShowAllSearch"

function App() {
	return (
		<HashRouter>
			<div className="wd-main-page">
				<Header />
				<Routes>
					<Route path="/" element={<Navigate to="Home" />}></Route>
					<Route path="Home" element={<Home />}></Route>
					<Route path="Community" element={<MessageBoard />}></Route>
					<Route path="signIn" element={<signIn />}></Route>
					<Route path="register" element={<Register />}></Route>
					<Route path="Profile" element={<Profile />}></Route>
					<Route path="Search" element={<Search/>}></Route>
					<Route path={"Search/:searchId/*"} element={<ShowAllSearch/>}></Route>
					<Route path={"Search/ShowAll/*"} element={<ShowAllSearch/>}></Route>
				</Routes>
			</div>
		</HashRouter>
	);
}

export default App;
