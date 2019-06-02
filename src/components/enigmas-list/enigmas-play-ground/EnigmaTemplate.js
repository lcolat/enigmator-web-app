import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import {FitnessCenter, LocalActivity, EventSeat, Create} from '@material-ui/icons';
import Divider from "@material-ui/core/Divider";
import {Paper, Tooltip} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 250,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const enigma = {
	creator: "DamSaulGoodMan",
	date: "18:02, 18/08/2018",
	difficulty: "HARD",
	value: "75"
};


function InfoEnigma() {
	
	const classes = useStyles();
	
	return (
		<Paper className={classes.root}>
			<List
				component="nav"
				subheader={<ListSubheader component="div">Enigma's Specificity</ListSubheader>}
				className={classes.root}
			>
				<Divider/>
				<Tooltip title={"Creator Name"} placement={"right"}>
					<ListItem alignItems={"center"}>
						<ListItemIcon>
							<EventSeat/>
						</ListItemIcon>
						<ListItemText primary={enigma.creator}/>
					</ListItem>
				</Tooltip>
				<Divider/>
				<Tooltip title={"Creation Date"} placement={"right"}>
					<ListItem alignItems={"center"}>
						<ListItemIcon>
							<Create/>
						</ListItemIcon>
						<ListItemText primary={enigma.date}/>
					</ListItem>
				</Tooltip>
				<Divider/>
				<Tooltip title={"Level of Difficulty"} placement={"right"}>
					<ListItem alignItems={"center"}>
						<ListItemIcon>
							<FitnessCenter/>
						</ListItemIcon>
						<ListItemText primary={enigma.difficulty}/>
					</ListItem>
				</Tooltip>
				<Divider/>
				<Tooltip title={"Reward Points"} placement={"right"}>
					<ListItem alignItems={"center"}>
						<ListItemIcon>
							<LocalActivity/>
						</ListItemIcon>
						<ListItemText primary={enigma.value}/>
					</ListItem>
				</Tooltip>
			</List>
		</Paper>
	);
}

export default InfoEnigma;

