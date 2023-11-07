import { React, useState } from "react";
import "./index.css";
import Message from "./message";
import db from "../../utils/Database";

function GlobalMessages() {
	const [messages, setMessages] = useState(db.messages);
	const [message, setMessage] = useState("");
	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setMessages([...messages, { id: messages.length + 1, uid: Math.floor(Math.random() * 5) + 1, input: message }]);
		setMessage("");
	};

	return (
		<div className="wd-community-global-message-board">
			<div className="wd-community-global-text-message">
				<div className="wd-global-messages-container">
					{messages.map((message, index) => (
						<Message key={index} text={message.input} uid={message.uid} />
					))}
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							value={message}
							onChange={handleMessageChange}
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
