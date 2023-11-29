import "./index.css";
import { useEffect, useState } from "react";
import PrivateMessages from "./PrivateMessages";
import GlobalMessages from "./GlobalMessages";
import ExpandedPrivateMessages from "./ExpandedPrivateMessages";

function MessageBoard(props) {
	const users = props.users;
	const [expandedId, setExpandedId] = useState(0);
	
	const changeExpandedId = (newExpandedId) => {
		setExpandedId(newExpandedId);
	};

	return (
		<div>
			<div className="wd-community-main">
				<PrivateMessages changeExpandedId={changeExpandedId} />
				<GlobalMessages />
			</div>
			{expandedId !== 0 && <ExpandedPrivateMessages expandedId={expandedId} users={users} />}
		</div>
	);
}

export default MessageBoard;
