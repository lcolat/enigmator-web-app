import React from 'react';
import PropType from "prop-types";

import {Grid, makeStyles, Paper, Fab, Typography} from '@material-ui/core';

import {Add} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	paper: {
		margin: theme.spacing(1),
		width: "80%",
	},
	titleDiv: {
		width: "100%"
	}
}));


function EnigmaTypeSelection(props) {
	const {} = props;
	const classes = useStyles();
	
	function CreateEnigmaPaper(props) {
		const {title} = props;
		
		return (
			<Paper className={classes.paper}>
				<Grid container
				      direction={"row"}
				      className={classes.titleDiv}
				      alignItems={"center"}
				      justify={"space-between"}>
					<Fab color="primary" aria-label="Add" className={classes.button}>
						<Add/>
					</Fab>
					<Grid item xs>
						<Grid container item alignItems={"center"} justify={"center"}>
							<Typography variant={"h4"}>New {title} Enigma</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		);
	}
	
	CreateEnigmaPaper.propTypes = {
		title: PropType.string.isRequired
	};
	
	return (
		<div>
			<Grid container alignItems={"center"} justify={"space-between"} direction={"column"}>
				<CreateEnigmaPaper title={"Visual"}/>
				<CreateEnigmaPaper title={"Textual"}/>
				<CreateEnigmaPaper title={"Audio"}/>
			</Grid>
		</div>
	);
}

EnigmaTypeSelection.propTypes = {};


export default EnigmaTypeSelection;