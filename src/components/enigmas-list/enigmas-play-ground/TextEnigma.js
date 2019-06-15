import React from 'react';
import PropType from "prop-types";

import {makeStyles, Typography} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
	root: {
		//display: 'flex',
		width: "100%",
		minHeight: 300
	},
}));


function TextEnigma(props) {
	const {} = props;
	const classes = useStyles();
	
	return (
		<div className={classes.root}>
			<Typography variant="body1" gutterBottom>
				Je suis le texte de cette énigme et oui je ne sais pas qui je suis
				Je vais surement etre inutile, comme le reste de ces mots mais je sert de test pour mon amis dev qui glr
				un
				peu en ce moment. Il n'arrive pas à mettre en forme cette p*** d'égime à la c** ^^ mais ne perdont pas
				espoir, un grand coeur finira par l'aider i BELIVIED IT !!!
			</Typography>
		</div>
	);
}

//TextEnigma.propTypes = {};


export default TextEnigma;