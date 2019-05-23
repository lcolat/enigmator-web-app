import React from 'react';

import TabChooser from "./TabChooser"
import TableFriends from "./TableFriends"


let counter = 0;

function createData(status, rank, pseudo, victory, score) {
	counter += 1;
	return {id: counter, status, rank, pseudo, victory, score};
}

const allFriendsList = [
	createData('online', 1, "DamsSaulGoodMan", 150, 9999),
	createData('online', 9999, "Kalfa", 0, 0),
	createData('offline', 2, "Kudo", 160, 8888),
	createData('absent', 3, "LegalizeCanasucre", 120, 8542),
	createData('dot not disturb', 69, "LaMereARaynal", 50, 752),
	createData('dot not disturb', 6969, "LaSoeurARaynal", 10, 20),
	createData('dot not disturb', 4, "LeChienARaynal", 103, 624)
];

const soloFriendsList = [
	createData('online', 1, "DamsSaulGoodMan", 150, 9999),
	createData('online', 9999, "Kalfa", 0, 0),
	createData('offline', 7, "Kudo", 100, 5200),
	createData('absent', 3, "LegalizeCanasucre", 120, 8542),
	createData('dot not disturb', 69, "LaMereARaynal", 50, 752),
	createData('dot not disturb', 6969, "LaSoeurARaynal", 10, 20),
	createData('dot not disturb', 4, "LeChienARaynal", 103, 624)
];

const multiFriendsList = [
	createData('online', 1, "DamsSaulGoodMan", 150, 9999),
	createData('online', 9999, "Kalfa", 0, 0),
	createData('offline', 2, "Kudo", 160, 8888),
	createData('absent', 3, "LegalizeCanasucre", 120, 8542),
	createData('dot not disturb', 4, "LeChienARaynal", 103, 624)
];

const battleFriendsList = [
	createData('online', 1, "DamsSaulGoodMan", 50, 9999),
	createData('online', 9999, "Kalfa", 0, 0),
	createData('dot not disturb', 40, "LeChienARaynal", 3, 624)
];

const friendsList = new Map([
	["ALL", allFriendsList],
	["SOLO", soloFriendsList],
	["MULTI", multiFriendsList],
	["BATTLE", battleFriendsList]
]);

class FriendsView extends React.Component {
	
	state = {
		categories: "ALL"
	};
	
	
	render() {
		return (
			<div>
				<TabChooser onClickHandler={() => alert("toto")}/>
				<TableFriends data={friendsList.get(this.state.categories)}/>
			</div>
		);
	}
}

export default FriendsView;