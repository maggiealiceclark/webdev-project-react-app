import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpandedMessage from "./message";

function ExpandedPrivateMessages(props) {
	const expandedId = props.expandedId;
	const users = props.users;
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [newInput, setNewInput] = useState(message.input);
	const newMessage = {
		...message,
		input: newInput !== "" ? newInput : message.input,
		uid: Math.floor(Math.random() * 5) + 1,
	};

	const API_BASE = "http://localhost:4000/api";
	const PRIVATE_MESSAGE_URL = `${API_BASE}/messages/private`;

	const findMessages = async (sender, receiver) => {
		try {
			const response = await axios.get(`${PRIVATE_MESSAGE_URL}/${sender}/${receiver}`);
			setMessages(response.data);
		} catch (error) {
			console.error("Error fetching messages:", error);
		}
	};
	useEffect(() => {
		findMessages(expandedId, 1);
	}, []);

	return (
		<div>
			<div className="wd-community-expanded-private-messages">
				{messages.map((message) => (
					<div>
						<ExpandedMessage message={message} users={users}/>
					</div>
				))}
			</div>
		</div>
	);
}

export default ExpandedPrivateMessages;
