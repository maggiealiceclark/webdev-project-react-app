import "./index.css";
import PrivateMessage from "./privateMessage";

function PrivateMessages(props) {
	const changeExpandedId = props.changeExpandedId;
	return (
		<div className="wd-community-private-messages">
			<PrivateMessage uid="1" changeExpandedId={changeExpandedId} />
			<PrivateMessage uid="2" changeExpandedId={changeExpandedId} />
			<PrivateMessage uid="3" changeExpandedId={changeExpandedId} />
			<PrivateMessage uid="4" changeExpandedId={changeExpandedId} />

		</div>
	);
}

export default PrivateMessages;
