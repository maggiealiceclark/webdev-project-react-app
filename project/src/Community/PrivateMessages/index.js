import "./index.css";
import PrivateMessage from "./privateMessage";

function PrivateMessages() {
	return (
		<div className="wd-community-private-messages">
			<PrivateMessage uid="1" />
			<PrivateMessage uid="2" />
			<PrivateMessage uid="3" />
			<PrivateMessage uid="4" />
		</div>
	);
}

export default PrivateMessages;
