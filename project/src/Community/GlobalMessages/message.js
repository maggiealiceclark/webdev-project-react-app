import React, { useState, useEffect } from "react";
import "./message.css";
import { Image } from "react-bootstrap";
import logo from "../../images/logo.png";
import { RxCross1 } from "react-icons/rx";
import * as userClient from "../../account/client";
import * as messageClient from "./client";
import { Link } from "react-router-dom";

function Message({ message, onDelete, role }) {
	const [user, setUser] = useState(null);
	const text = message.input;
	const userId = message.userId;

	const deleteMessage = async () => {
		try {
			await messageClient.deleteMessage(message);
			onDelete(message); // Update local state by invoking the callback
		} catch (error) {
			console.error("Error deleting message:", error);
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userResponse = await userClient.findUserById(userId);
				setUser(userResponse);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser();
	}, [userId]);

	if (!user) {
		// Render loading state or return null if user is not available yet
		return null;
	}

	return (
		<div className="wd-message-container">
			<div className="wd-message-user">
				<Image src={logo} alt={"Profile Picture"} roundedCircle className="wd-global-message-profile-picture" />
				<Link to={`/profile/${user._id}`} className="wd-message-user-link">
					<p className="wd-message-user-username">{user.username}</p>
				</Link>
			</div>
			<div className="wd-message-contents">
				<div className="wd-message-text">{text}</div>
				<div className="wd-message-date">{message.date}</div>
			</div>

			{role === "ADMIN" && (
				<div className="wd-message-delete" onClick={deleteMessage}>
					<RxCross1 />
				</div>
			)}
		</div>
	);
}

export default Message;
