import React from 'react';

import PropTypes from "prop-types";

import {Button, makeStyles, Paper, Typography} from "@material-ui/core";
import {Grid, Box} from "@material-ui/core";

import InfoEnigma from "./InfoEnigma";
import ListWordTry from "./ListWordTry";
import EntryForResponse from "./EntryForResponse";
import {LikeCount} from "./../../../../commun";
import {Gavel, OpenInNew} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	leftGrid: {
		//marginLeft: theme.spacing(1),
		//marginRight: theme.spacing(1)
	},
	descriptionPaper: {
		maxWidth: 250,
		height: 300,
		overflow: "hidden",
		wordWrap: "break-word",
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(1),
	},
	enigmaBox: {
		marginLeft: theme.spacing(1),
		overflow: "hidden",
	}
}));

const enigma = {
	name: "Besahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
	creator: "DamSaulGoodMan",
	date: "18:02, 18/08/2018",
	difficulty: "HARD",
	value: "75",
	description: "Guess the real number of 'h' in Besahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
	likeNumber: 100,
	isLikedByUser: false
};
const stack = ["LaMereNoire",
	"LaMereNoire",
	"LaMereNoire"];
stack.push("LaMereMorte");
stack.push("LaMereRouge");
stack.push("LaMereBalte");

function TemplateEnigma(props) {
	const {enigmaView, hasChat} = props;
	const classes = useStyles();
	
	return (
		<div>
			<Grid container
			      direction={"column"}
			      justify={"space-between"}
			      alignItems={"stretch"}
			      className={classes.leftGrid}>
				<Grid item xs>
					<InfoEnigma enigma={enigma}/>
				</Grid>
				<Grid item xs>
					<Paper className={classes.descriptionPaper}>
						<Typography title={"h5"} color={"primary"}>Description</Typography>
						{enigma.description}
					</Paper>
				</Grid>
				<Grid item xs>
					<ListWordTry stackWords={stack}/>
				</Grid>
			</Grid>
			<Grid container
			      alignItems={"center"}
			      direction={"column"}
			      justify={"flex-start"}
			      className={classes.enigmaBox}>
				<Typography title={"h3"}>{enigma.name}</Typography>
				<Box component="div" m={1} color={"primary"}>
					{enigmaView}
				</Box>
				<Grid item container direction={"row"} justify={"center"} alignItems={"center"}>
					<Grid item xl>
						<EntryForResponse/>
					</Grid>
					<Grid item xs>
						<LikeCount liked={enigma.isLikedByUser} likes={enigma.likeNumber}/>
						<Button variant="contained" color="primary" className={classes.button}>
							Forum
							<OpenInNew className={classes.rightIcon}>Forum</OpenInNew>
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

TemplateEnigma.propTypes = {
	enigmaView: PropTypes.container.isLikedByUser
};


export default TemplateEnigma