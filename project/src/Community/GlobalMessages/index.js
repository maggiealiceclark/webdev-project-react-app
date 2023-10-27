import "./index.css";
import { useState } from "react";

function GlobalMessages() {
	const [message, setMessage] = useState("");

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(message);
		setMessage("");
	};

	return (
		<div className="wd-community-global-message-board">
			<div className="wd-community-global-text-message">
				<form onSubmit={handleSubmit}>
					<input type="text" value={message} onChange={handleMessageChange} className="wd-community-global-text-message-text-box" />
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	);
}
export default GlobalMessages;
