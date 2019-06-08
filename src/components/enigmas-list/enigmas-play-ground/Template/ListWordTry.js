import React from 'react';

import {makeStyles} from "@material-ui/core";
import {List, ListItem, ListItemText} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
	root: {
		overflow: 'auto',
		width: '100%',
		height: 200,
		maxWidth: 300,
		backgroundColor: theme.palette.background.paper.fontcolor("yellow")
	}
}));

/// Example of props
// const stack = ["LaMereNoire",
// 	"LaMereNoire",
// 	"LaMereNoire"];
// stack.push("LaMereMorte");
// stack.push("LaMereRouge");
// stack.push("LaMereBalte");

function getWords(props) {
	const {stackOfWords} = props;
	
	return stackOfWords.map((word, index) => {
		return (<ListItem key={word} style={{overflow: "hidden", wordWrap: "break-word"}}>
			<ListItemText primary={`${stackOfWords.length - index} - ${word}`}/>
		</ListItem>)
	})
}

function ListWordTry(props) {
	const classes = useStyles();
	
	return (
		<div>
			<List className={classes.root}>
				{getWords(props)}
			</List>
		</div>
	);
}

export default ListWordTry;