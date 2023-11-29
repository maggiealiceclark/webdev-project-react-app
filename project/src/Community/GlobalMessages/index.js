import { React, useState, useEffect } from "react";
import "./index.css";
import Message from "./message";
import axios from "axios";

function GlobalMessages() {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [newInput, setNewInput] = useState("");
	const newMessage = {
		...message,
		input: newInput !== "" ? newInput : message.input,
		uid: Math.floor(Math.random() * 5) + 1,
	};

	const API_BASE = "http://localhost:4000/api";
	const GLOBAL_MESSAGE_URL = `${API_BASE}/messages/global`;
	
	useEffect(() => {
		const findAllMessages = async () => {
			try {
				const response = await axios.get(GLOBAL_MESSAGE_URL);
				setMessages(response.data);
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};

		findAllMessages();
	}, []);

	const addNewMessage = async () => {
		const response = await axios.post(GLOBAL_MESSAGE_URL, newMessage);
		if (response.data) {
			setMessages([...messages, response.data]);
		}
		setMessage(message);
		setNewInput("");
	};
	const deleteMessage = async (message) => {
		console.log(message);
		const response = await axios.delete(`${GLOBAL_MESSAGE_URL}/${message._id}`);
		setMessages(messages.filter((c) => c._id !== message._id));
	};

	return (
		<div className="wd-community-global-message-board">
			<div className="wd-community-global-text-message">
				<div className="wd-global-messages-container">
					{messages.map((message) => (
						<Message key={message._id} message={message} />
					))}
				</div>
				<div>
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
						/>
						<button type="submit">Send</button>
					</form>
				</div>
			</div>
		</div>
	);
}
export default GlobalMessages;
