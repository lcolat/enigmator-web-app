import React from 'react';
import PropType from "prop-types";

import {makeStyles, Grid} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
	root: {
		display: 'center',
		width: "100%",
	},
}));


function TextEnigma(props) {
	const {} = props;
	const classes = useStyles();
	
	return (
		<Grid container
		      alignItems={"stretch"}
		      direction={"column"}>
			<Grid item xl>
				<img
					alt={"enigma picture"}
					src={process.env.PUBLIC_URL + '/img/default-profile-picture.jpg'}/>
			</Grid>
		</Grid>
	
	);
}

//TextEnigma.propTypes = {};


export default TextEnigma;