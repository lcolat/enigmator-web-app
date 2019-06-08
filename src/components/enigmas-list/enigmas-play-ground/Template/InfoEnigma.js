import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {ListSubheader, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Divider, Tooltip, Paper} from "@material-ui/core";

import {FitnessCenter, LocalActivity, EventSeat, Create} from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 250,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	}
}));

function InfoEnigma(props) {
	const {enigma} = props;
	const classes = useStyles();
	
	return (
		<Paper className={classes.root}>
			<List
				component="nav"
				subheader={<ListSubheader component="div">Enigma's Specificity</ListSubheader>}
				className={classes.rootEnigmaInfo}
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

/**Example of props
 InfoEnigma({
	enigma: {
		creator: "DamSaulGoodMan",
		date: "18:02, 18/08/2018", difficulty: "HARD",
		value: "75"
	}
});**/
