import PrivateMessages from "./PrivateMessages";
import GlobalMessages from "./GlobalMessages";
import "./index.css";

function MessageBoard() {
	return (
		<div className="wd-community-main">
			<PrivateMessages />
			<GlobalMessages />
		</div>
	);
}

export default MessageBoard;
