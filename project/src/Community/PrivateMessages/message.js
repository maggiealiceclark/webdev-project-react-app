import React from "react";
import { Image } from "react-bootstrap";
import "./index.css";
import "../index.css";
import logo from "../../images/logo.png";

function Message(props) {
	const message = props.message;
	const user = props.user;
	return (
		<div className="wd-community-private-message">
			<div className="wd-community-private-message-header">
				<div className="wd-message-profile-picture-container">
					<Image src={logo} alt="Profile Picture" roundedCircle className="wd-message-profile-picture" />
				</div>
				<div>
					<h5>{user}</h5>
				</div>
			</div>
			<div className="wd-community-private-message-body">
				<h5>{message}</h5>
			</div>
		</div>
	);
}

export default Message;
