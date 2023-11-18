import "./message.css";
import { Image } from "react-bootstrap";
import db from "../../utils/Database";
import logo from "../../images/logo.png";
import { RxCross1 } from "react-icons/rx";

function Message(props) {
	const message = props.message;
	const text = message.input;
	const user = db.users.find((user) => user.uid === message.uid);
	const deleteMessage = props.deleteMessage;
	return (
		<div className="wd-message-container">
			<div className="wd-message-user">
				<Image src={logo} alt={user.name} roundedCircle className="wd-global-message-profile-picture" />
				<p className="wd-message-user-username">{user.name}</p>
			</div>
			<div className="wd-message-text">{text}</div>
			<div className="wd-message-delete" onClick={() => deleteMessage(message)}>
				<RxCross1 />
			</div>
		</div>
	);
}

export default Message;
