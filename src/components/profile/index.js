import React from "react";

import UserData from "./UserData"
import {StatsTable} from "../../commun";
import TableListEnigmasTried from "./TableListEnigmasTried";
import TableListOwnEnigmas from "./TableListOwnEnigmas";
import {Paper} from "@material-ui/core";


class Profile extends React.Component {
	
	render() {
		return (
			<dic>
				<Paper>
					<UserData/>
					<StatsTable/>
				</Paper>
				<div>
					<hr/>
				</div>
				<Paper>
					<TableListOwnEnigmas/>
					<TableListEnigmasTried/>
				</Paper>
			</dic>
		);
	}
}

export default Profile;