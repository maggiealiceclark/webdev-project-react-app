import "./index.css";
import PrivateMessage from "./privateMessage";

function PrivateMessages(props) {
	const setExpandedId = props.setExpandedId;
	return (
		<div className="wd-community-private-messages">
			<PrivateMessage uid="1" setExpandedId={setExpandedId} />
			<PrivateMessage uid="2" setExpandedId={setExpandedId} />
			<PrivateMessage uid="3" setExpandedId={setExpandedId} />
			<PrivateMessage uid="4" setExpandedId={setExpandedId} />
		</div>
	);
}

export default PrivateMessages;
