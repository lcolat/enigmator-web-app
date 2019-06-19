import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

import {Tab, Tabs, Grid} from "@material-ui/core";
import {AllInclusive, Rowing, SupervisedUserCircle, Whatshot, PersonAdd} from '@material-ui/icons';

import {SearchPick} from "../../common"
import AddFriendButton from "./AddFriendButton"


const styles = theme => ({
	root: {
		//flexGrow: 3,
		maxWidth: "100%",
	},
	rootButton: {
		marginTop: theme.spacing.unit * 2,
		marginRight: 0,
		//flexGrow: 1,
	},
});

const tabType = ["ALL", "SOLO", "MULTI", "BATTLE"];

class TabChooser extends React.Component {
	
	state = {
		value: 0,
	};
	
	handleChange = (event, value) => {
		this.setState({value});
		this.props.changeTable(tabType[value]);
	};

	render() {
		const {classes, friendList, handleChange} = this.props;
		
		return (
			<Paper square className={classes.root}>
				<Grid container direction={"row"}>
					<Tabs
						value={this.state.value}
						onChange={handleChange}
						variant="fullWidth"
						indicatorColor="secondary"
						textColor="secondary"
					>
						<Tab icon={<AllInclusive/>} label={tabType[0]}/>
						<Tab icon={<Rowing/>} label={tabType[1]}/>
						<Tab icon={<SupervisedUserCircle/>} label={tabType[2]}/>
						<Tab icon={<Whatshot/>} label={tabType[3]}/>
					</Tabs>
					<SearchPick suggestions={friendList}/>
					<div className={classes.rootButton}>
						<AddFriendButton/>
					</div>
				</Grid>
			</Paper>
		);
	}
}

TabChooser.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabChooser);