import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {AllInclusive, Rowing, SupervisedUserCircle, Whatshot, PersonAdd} from '@material-ui/icons';

import SearchPick from "../../commun/SearchPick"
import Button from "@material-ui/core/Button";


const stylesButton = theme => ({
	root: {
		marginTop: theme.spacing.unit * 2,
		//marginBottom: 0,
		flexGrow: 1,
	},
	button: {
		margin: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	}
});

function ButtonAddFriend(props) {
	const {classes} = props;
	
	return (
		<div className={classes.root}>
			<Button cl variant="contained" color="primary" className={classes.button}>
				ADD
				<PersonAdd className={classes.rightIcon}/>
			</Button>
		</div>
	);
}

const buttonAddFriend = withStyles(stylesButton)(ButtonAddFriend);


const styles = {
	root: {
		flexGrow: 1,
		maxWidth: "100%",
	}
};

class TabChooser extends React.Component {
	state = {
		value: 0,
	};
	
	handleChange = (event, value) => {
		this.setState({value});
	};
	
	render() {
		const {classes} = this.props;
		
		return (
			<Paper square className={classes.root}>
				<Tabs
					value={this.state.value}
					onChange={this.handleChange}
					variant="fullWidth"
					indicatorColor="secondary"
					textColor="secondary"
				>
					<Tab icon={<AllInclusive/>} label="ALL"/>
					<Tab icon={<Rowing/>} label="SOLO"/>
					<Tab icon={<SupervisedUserCircle/>} label="MULTI"/>
					<Tab icon={<Whatshot/>} label="BATTLE"/>
					<Tab component={SearchPick}/>
					<Tab component={buttonAddFriend}/>
				</Tabs>
			</Paper>
		);
	}
}

TabChooser.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabChooser);