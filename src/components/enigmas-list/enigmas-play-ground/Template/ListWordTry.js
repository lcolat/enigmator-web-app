import React from 'react';

import {makeStyles} from "@material-ui/core";
import {List, ListItem, ListItemText, ListSubheader} from '@material-ui/core';
import PropTypes from "prop-types";


const useStyles = makeStyles(theme => ({
	root: {
		overflow: 'auto',
		width: '100%',
		height: 150,
		maxWidth: 250,
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


function ListWordTry(props) {
	const {stackWords} = props;
	const classes = useStyles();
	
	return (
		<div>
			<List dense={true}
			      className={classes.root}
			      subheader={
				      <ListSubheader disableSticky component="div" color={"primary"}>Lasts words tried</ListSubheader>
			      }
			      component={"ul"}>
				{stackWords.map((word, index) => {
					return (
						<ListItem key={`${stackWords.length - index}-${word}`}
						          style={{overflow: "hidden", wordWrap: "break-word"}}>
							<ListItemText primary={`${stackWords.length - index} - ${word}`}/>
						</ListItem>
					)
				})}
			</List>
		</div>
	);
}

ListWordTry.propTypes = {
	stackWords: PropTypes.array.isRequired,
};


export default ListWordTry;