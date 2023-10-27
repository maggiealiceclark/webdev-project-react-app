import "./index.css";
import Message from "./message";

function PrivateMessages() {
	return (
		<div className="wd-community-private-messages">
			<Message user="cole" message="hello" />
			<Message user="ethan" message="hi" />
			<Message user="maggie "message="hey" />
			<Message user="lam" message="hola" />
		</div>
	);
}

export default PrivateMessages;
