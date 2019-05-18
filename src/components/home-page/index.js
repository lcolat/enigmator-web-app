import React from "react";
import {Grid, withStyles} from "@material-ui/core";

import UserStatsResume from "./UserStatsResume";
import TabUnresolvedEnigmas from "./TabUnresolvedEnigmas";
import EnigmasList from "./EnigmasList";
import DailyMessage from "./DailyMessage"

const styles = theme => ({});

class HomePage extends React.Component {
	
	render() {
		return (
			<div>
				<Grid container direction={"column"} justify={"space-around"} spacing={16}>
					<Grid item>
						<Grid container direction={"row"} spacing={16}>
							<Grid item xs>
								<UserStatsResume score={"1000"} winNumber={"2"} globalRank={"75"} localRank={"8"}/>
							</Grid>
							<Grid item xs>
								<TabUnresolvedEnigmas/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs>
						<DailyMessage
							message={"This is a test for the daily message, i want to see how it will be wrapped and if it will."}/>
					</Grid>
					<Grid item xs>
						<EnigmasList/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(HomePage);