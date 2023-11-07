import React from "react";
import { Image } from "react-bootstrap";
import "./index.css";
import logo from "../../images/logo.png";
import db from "../../utils/Database";

function Message(props) {
	const uid = parseInt(props.uid);
	const user = db.users.find((user) => user.uid === uid);
	return (
		<div className="wd-community-private-message">
			<div className="wd-community-private-message-header">
				<div className="wd-message-profile-picture-container">
					<Image src={logo} alt="Profile Picture" roundedCircle className="wd-private-message-profile-picture" />
				</div>
				<div>
					<h5>{user.name}</h5>
				</div>
			</div>
			<div className="wd-community-private-message-body">
				<h5>temp</h5>
			</div>
		</div>
	);
}

export default Message;
