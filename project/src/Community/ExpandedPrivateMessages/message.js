import React from "react";
import { Image } from "react-bootstrap";
import logo from "../../images/logo.png";
import "./index.css";

function ExpandedMessage(props) {
	const message = props.message;
	const users = props.users;
	const sender = users.find((user) => message.fromUid === user.uid);
	return (
		<div className="wd-community-expanded-private-message">
			<div className="wd-community-expanded-private-message-user">
				<div className="wd-expanded-message-profile-picture-container">
					<Image
						src={logo}
						alt="Profile Picture"
						roundedCircle
						className="wd-expanded-private-message-profile-picture"
					/>
				</div>
				<div>
					<p className="wd-expanded-private-message-name">name</p>
				</div>
			</div>
			<div className="wd-community-expanded-private-message-body">
				<p className="wd-community-expanded-private-message-text">{message.input}</p>
			</div>
		</div>
	);
}

export default ExpandedMessage;
