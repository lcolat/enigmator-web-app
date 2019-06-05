import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {FitnessCenter, LocalActivity, EventSeat, Create} from '@material-ui/icons';
import Divider from "@material-ui/core/Divider";
import {Paper, Tooltip} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	rootEnigmaInfo: {
		maxWidth: 250,
		backgroundColor: theme.palette.background.paper,
	},
	rootWordTry: {
		width: '100%',
		height: 400,
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

// const enigmaTest = {
// 	creator: "DamSaulGoodMan",
// 	date: "18:02, 18/08/2018",
// 	difficulty: "HARD",
// 	value: "75"
// };


// function InfoEnigma(props) {
//
// 	const {enigma} = props;
// 	const classes = useStyles();
//
// 	return (
// 		<Paper className={classes.rootEnigmaInfo}>
// 			<List
// 				component="nav"
// 				subheader={<ListSubheader component="div">Enigma's Specificity</ListSubheader>}
// 				className={classes.rootEnigmaInfo}
// 			>
// 				<Divider/>
// 				<Tooltip title={"Creator Name"} placement={"right"}>
// 					<ListItem alignItems={"center"}>
// 						<ListItemIcon>
// 							<EventSeat/>
// 						</ListItemIcon>
// 						<ListItemText primary={enigma.creator}/>
// 					</ListItem>
// 				</Tooltip>
// 				<Divider/>
// 				<Tooltip title={"Creation Date"} placement={"right"}>
// 					<ListItem alignItems={"center"}>
// 						<ListItemIcon>
// 							<Create/>
// 						</ListItemIcon>
// 						<ListItemText primary={enigma.date}/>
// 					</ListItem>
// 				</Tooltip>
// 				<Divider/>
// 				<Tooltip title={"Level of Difficulty"} placement={"right"}>
// 					<ListItem alignItems={"center"}>
// 						<ListItemIcon>
// 							<FitnessCenter/>
// 						</ListItemIcon>
// 						<ListItemText primary={enigma.difficulty}/>
// 					</ListItem>
// 				</Tooltip>
// 				<Divider/>
// 				<Tooltip title={"Reward Points"} placement={"right"}>
// 					<ListItem alignItems={"center"}>
// 						<ListItemIcon>
// 							<LocalActivity/>
// 						</ListItemIcon>
// 						<ListItemText primary={enigma.value}/>
// 					</ListItem>
// 				</Tooltip>
// 			</List>
// 		</Paper>
// 	);
// }
//
// export default InfoEnigma({
// 	enigma: {
// 		creator: "DamSaulGoodMan",
// 		date: "18:02, 18/08/2018", difficulty: "HARD",
// 		value: "75"
// 	}
// });


export default function ListWordTry() {
	const classes = useStyles();
	
	return (
		<div>
			<List className={classes.rootWordTry}>
				{[0, 1, 2].map(item => (
					<ListItem key={`item-${item}`}>
						<ListItemText primary={`Item ${item}`}/>
					</ListItem>
				))}
			</List>
		</div>
	);
}