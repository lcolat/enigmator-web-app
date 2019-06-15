import React from 'react';

import PropTypes from 'prop-types';

import {makeStyles} from "@material-ui/core";
import {Button} from "@material-ui/core";

import {ThumbUp} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	rightIcon: {
		marginLeft: theme.spacing(1),
	}
}));

function LikeCount(props) {
	const classes = useStyles();
	const {liked, likes} = props;
	
	return (
		<Button variant="contained" color={liked ? "primary" : "secondary"}>
			{likes}
			<ThumbUp className={classes.rightIcon}>like</ThumbUp>
		</Button>
	);
}

LikeCount.propTypes = {
	liked: PropTypes.bool.isRequired,
	likes: PropTypes.number.isRequired
};

export default LikeCount;