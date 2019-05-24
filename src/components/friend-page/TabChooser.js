import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {AllInclusive, Rowing, SupervisedUserCircle, Whatshot, PersonAdd} from '@material-ui/icons';

import SearchPick from "../../commun/SearchPick"
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";


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
	button: {
		margin: theme.spacing.unit
	},
	buttonRightIcon: {
		marginLeft: theme.spacing.unit
	}
});

class TabChooser extends React.Component {
	state = {
		value: 0,
	};
	props = {
		type: ["ALL"]
	};
	
	handleChange = (event, value) => {
		this.setState({value});
	};
	
	static onClickHandler(label) {
		return label
	}
	
	render() {
		const {classes, onClickHandler} = this.props;
		
		return (
			<Paper square className={classes.root}>
				<Grid container direction={"row"}>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						variant="fullWidth"
						indicatorColor="secondary"
						textColor="secondary"
					>
						<Tab icon={<AllInclusive/>} label="ALL" onClick={onClickHandler(this.props.type[this.state])}/>
						<Tab icon={<Rowing/>} label="SOLO"/>
						<Tab icon={<SupervisedUserCircle/>} label="MULTI"/>
						<Tab icon={<Whatshot/>} label="BATTLE"/>
					</Tabs>
					<SearchPick/>
					<div className={classes.rootButton}>
						<Button cl variant="contained" color="primary" className={classes.button}>
							ADD
							<PersonAdd className={classes.buttonRightIcon}/>
						</Button>
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