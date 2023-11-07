import "./message.css";
import { Image } from "react-bootstrap";
import db from "../../utils/Database";
import logo from "../../images/logo.png";

function Message(props) {
	const text = props.text;
	const uid = props.uid;
	const user = db.users.find((user) => user.uid === uid);
	return (
		<div className="wd-message-container">
			<div className="wd-message-user">
				<Image src={logo} alt={user.name} roundedCircle className="wd-global-message-profile-picture" />
				<p className="wd-message-user-username">{user.name}</p>
			</div>
			<div className="wd-message-text">{text}</div>
		</div>
	);
}

export default Message;
