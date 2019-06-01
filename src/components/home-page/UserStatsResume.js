import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Paper, ButtonBase} from "@material-ui/core";

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: 2,//theme.spacing.unit * 2,
		//margin: 'auto',
	},
	paperStats: {
		paddingTop: 4
	},
	image: {
		width: 200,
		height: 110,
		border: '3px solid purple',
		borderRadius: '6px!important'
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: "100%",
		maxHeight: "100%",
		borderRadius: '6px!important'
	}
});

function UserStatsResume(props) {
	const {classes, theme, score, winNumber, globalRank, localRank, profilePicture} = props;
	
	return (
		<div className={classes.root}>
			<Grid container>
				<Grid xs container direction={"column"}>
					<Grid item xs>
						<Paper className={classes.paperStats}>
							<Grid xs container direction={"row"}>
								<Grid item xs>
									<Typography gutterBottom variant="h4" align={"left"}>
										Score
									</Typography>
								</Grid>
								<Grid item xs>
									<Typography variant="h4" align={"center"}>
										{score}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
						<Paper className={classes.paperStats}>
							<Grid container direction={"row"}>
								<Grid item xs>
									<Typography gutterBottom variant="h4" align={"left"}>
										Win
									</Typography>
								</Grid>
								<Grid item xs>
									<Typography variant="h4" align={"center"}>
										{winNumber}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				<Grid item>
					<ButtonBase className={classes.image}>
						<img className={classes.img}
							 alt="complex"
							 src={profilePicture}/>
					</ButtonBase>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item>
					<img className={classes.img} alt="complex" src={process.env.PUBLIC_URL + '/img/podium.png'}/>
				</Grid>
				<Grid xs container direction={"column"}>
					<Grid item xs>
						<Paper className={classes.paperStats}>
							<Grid xs container direction={"row"}>
								<Grid item xs>
									<Typography gutterBottom variant="h4" align={"left"} noWrap>
										Global Rank
									</Typography>
								</Grid>
								<Grid item xs>
									<Typography variant="h4" align={"center"}>
										{globalRank}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
						<Paper className={classes.paperStats}>
							<Grid container direction={"row"}>
								<Grid item xs>
									<Typography gutterBottom variant="h4" align={"left"} noWrap>
										Local Rank
									</Typography>
								</Grid>
								<Grid item xs>
									<Typography variant="h4" align={"center"}>
										{localRank}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

UserStatsResume.defaultProps = {
	profilePicture: process.env.PUBLIC_URL + '/img/default-profile-picture.png'
};

UserStatsResume.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	
	score: PropTypes.number.isRequired,
	winNumber: PropTypes.number.isRequired,
	globalRank: PropTypes.number.isRequired,
	localRank: PropTypes.number.isRequired,
	profilePicture: PropTypes.element
};

export default withStyles(styles, {withTheme: true})(UserStatsResume);