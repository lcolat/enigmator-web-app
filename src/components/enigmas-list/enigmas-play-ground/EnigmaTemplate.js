import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {FitnessCenter, LocalActivity, EventSeat, Create, Gavel} from '@material-ui/icons';
import Divider from "@material-ui/core/Divider";
import {Paper, TextField, Tooltip, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

import Stack from "../../../utils/Stack"
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
	rootEnigmaInfo: {
		maxWidth: 250,
		backgroundColor: theme.palette.background.paper,
	},
	rootWordTry: {
		overflow: 'auto',
		width: '100%',
		height: 200,
		maxWidth: 300,
		backgroundColor: theme.palette.background.paper.fontcolor("yellow")
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	marginTextField: {
		margin: theme.spacing(1)
	}
}));

const enigmaTest = {
	creator: "DamSaulGoodMan",
	date: "18:02, 18/08/2018",
	difficulty: "HARD",
	value: "75"
};


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
// InfoEnigma({
// 	enigma: {
// 		creator: "DamSaulGoodMan",
// 		date: "18:02, 18/08/2018", difficulty: "HARD",
// 		value: "75"
// 	}
// });
//
// const stack = ["LaMereNoire",
// 	"LaMereNoire",
// 	"LaMereNoire"];
// stack.push("LaMereMorte");
// stack.push("LaMereRouge");
// stack.push("LaMereBalte");
//
// function getWords() {
// 	return stack.map((word, index) => {
// 		return (<ListItem key={word} style={{overflow: "hidden", wordWrap: "break-word"}}>
// 			<ListItemText primary={`${stack.length - index} - ${word}`}/>
// 		</ListItem>)
// 	})
// }
//
//
// function ListWordTry() {
// 	const classes = useStyles();
//
// 	return (
// 		<div>
// 			<List className={classes.rootWordTry}>
// 				{getWords()}
// 			</List>
// 		</div>
// 	);
// }

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'green',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'green',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'red',
			},
			'&:hover fieldset': {
				borderColor: 'yellow',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'green',
			},
		},
	},
})(TextField);

// export default function EntryForWord() {
// 	const classes = useStyles();
//
// 	return (
// 		<CssTextField
// 			className={classes.marginTextField}
// 			label="Response"
// 			variant="outlined"
// 			id="entry-response"
// 			InputProps={{
// 				endAdornment: (
// 					<InputAdornment position="end">
// 						<IconButton aria-label="Submit" size="medium">
// 							<Gavel fontSize="inherit" />
// 						</IconButton>
// 					</InputAdornment>
// 				),
// 			}}
// 		/>
// 	);
// }