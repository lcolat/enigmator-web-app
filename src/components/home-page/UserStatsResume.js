import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

import defaultProfilePicture from "./default-profile-picture.jpg"

const styles = theme => ({
	card: {
		display: 'flex',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 150,
		marginBottom: 90,
		border: '0px solid black',
		borderRadius: '6px!important'
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
	}
});

function UserStatsResume(props) {
	const {classes, theme, score, winNumber, globalRank, localRank, profilePicture} = props;
	
	return (
		<Card className={classes.card}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Grid container alignItems="center">
						<Grid item xs>
							<Typography gutterBottom variant="h4">
								Score
							</Typography>
						</Grid>
						<Grid item>
							<Typography gutterBottom variant="h6">
								{score}
							</Typography>
						</Grid>
					</Grid>
					<Grid container alignItems="center">
						<Grid item xs>
							<Typography gutterBottom variant="h4">
								Win
							</Typography>
						</Grid>
						<Grid item>
							<Typography gutterBottom variant="h6">
								{winNumber}
							</Typography>
						</Grid>
					</Grid>
					<Grid container alignItems="center">
						<Grid item xs>
							<Typography gutterBottom variant="h4">
								Global Rank
							</Typography>
						</Grid>
						<Grid item>
							<Typography gutterBottom variant="h6">
								{globalRank}
							</Typography>
						</Grid>
					</Grid>
					<Grid container alignItems="center">
						<Grid item xs>
							<Typography gutterBottom variant="h4">
								Local Rank
							</Typography>
						</Grid>
						<Grid item>
							<Typography gutterBottom variant="h6">
								{localRank}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</div>
			<CardMedia
				className={classes.cover}
				image={defaultProfilePicture}
				title="Avatar"
			/>
		</Card>
	);
}

UserStatsResume.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	
	score: PropTypes.number.isRequired,
	winNumber: PropTypes.number.isRequired,
	globalRank: PropTypes.number.isRequired,
	localRank: PropTypes.number.isRequired,
	// avatar: PropTypes.picture
};

export default withStyles(styles, {withTheme: true})(UserStatsResume);