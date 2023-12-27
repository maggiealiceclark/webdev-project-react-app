import * as client from "./client";
import { React, useState, useEffect } from "react";
import "./index.css";
import Message from "./message";
import axios from "axios";

const API_BASE = "http://localhost:4000/api";
const API_MESSAGE = `${API_BASE}/messages/`;

function GlobalMessages() {
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [newInput, setNewInput] = useState("");
	const [profile, setProfile] = useState(null);

	const fetchAccount = async () => {
		const account = await client.account();
		setProfile(account);
		setIsLoading(false);
	};

	const addNewMessage = async (event) => {
		event.preventDefault();

		if (newInput === "") {
			return;
		}

		try {
			let date = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
			const response = await client.createMessage({
				userId: profile._id,
				input: newInput !== "" ? newInput : message.input,
				date: `-  ${date}`, // Add the current date for the new message
			});

			setMessages([...messages, response]);
			setNewInput("");
		} catch (error) {
			console.error("Error creating message:", error);
		}
	};

	const deleteMessage = async (deletedMessage) => {
		try {
			await client.deleteMessage(deletedMessage);
			// Update local state by filtering out the deleted message
			setMessages((prevMessages) => prevMessages.filter((m) => m._id !== deletedMessage._id));
		} catch (error) {
			console.error("Error deleting message:", error);
		}
	};

	const findAllMessages = async () => {
		const response = await client.findAllMessages();
		setMessages(response);
	};

	useEffect(() => {
		fetchAccount();
		findAllMessages();
	}, []);

	return (
		<div className="wd-community">
			<div className="wd-community-header">
				<p className="wd-community-header-text">Final.fm Community Board </p>
			</div>
			<div className="wd-community-global-message-board">
				<div className="wd-community-global-text-message">
					<div className="wd-global-messages-container">
						{messages.map((message) => (
							<Message key={message._id} message={message} onDelete={deleteMessage} role={profile.role} />
						))}
					</div>
					<div className="wd-new-message-container">
						<form onSubmit={addNewMessage}>
							<input
								type="text"
								value={newInput}
								onClick={(event) => {
									event.preventDefault();
									event.stopPropagation();
								}}
								onChange={(event) => {
									setNewInput(event.target.value);
								}}
								className="wd-community-global-text-message-text-box"
								placeholder="Type your message..."
							/>
							<button type="submit" className="wd-button">
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GlobalMessages;