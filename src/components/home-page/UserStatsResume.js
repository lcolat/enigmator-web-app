import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import ButtonBase from '@material-ui/core/ButtonBase'

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: 2
	},
	paperStats: {
		paddingTop: 4
	},
	profilePicture: {},
	globalRankPicture: {
		height: '183px'
	},
	image: {
		width: 200,
		height: 110,
		border: '3px solid purple',
		borderRadius: '6px!important'
	}
})

function UserStatsResume(props) {
	const { classes, score, winNumber, globalRank, localRank } = props

	return (
		<Paper className={classes.root}>
			<Grid container>
				<Grid container direction={'row'}>
					<Grid item xs>
						<Paper className={classes.paperStats}>
							<Grid xs container direction={'row'}>
								<Grid item xs>
									<Typography gutterBottom variant="h4" align={'left'}>
										Score
									</Typography>
								</Grid>
								<Grid item xs>
									<Typography variant="h4" align={'center'}>
										{score}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
						<Paper className={classes.paperStats}>
							<Grid container direction={'row'}>
								<Grid item xs>
									<Typography gutterBottom variant="h4" align={'left'}>
										Victoires
									</Typography>
								</Grid>
								<Grid item xs>
									<Typography variant="h4" align={'center'}>
										{winNumber}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item>
						<ButtonBase
							onClick={() => {
								props.history.push({
									pathname: '/profile'
								})
							}}
							className={classes.image}>
							<img
								className={classes.profilePicture}
								alt="Profile"
								src={
									process.env.PUBLIC_URL + '/img/default-profile-picture.jpg'
								}
							/>
						</ButtonBase>
					</Grid>
				</Grid>
			</Grid>
			<Grid container direction={'row'} alignItems="center">
				<Grid item xs={4}>
					<img
						className={classes.globalRankPicture}
						alt="Global rank"
						src={process.env.PUBLIC_URL + '/img/podium.png'}
					/>
				</Grid>
				<Grid item xs={8}>
					<Grid xs container direction={'column'}>
						<Grid item xs>
							<Paper className={classes.paperStats}>
								<Typography gutterBottom variant="h5" align={'center'} noWrap>
									Classement Mondial <br /> {globalRank}
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paperStats}>
								<Typography gutterBottom variant="h5" align={'center'} noWrap>
									Classement Local <br /> {localRank}
								</Typography>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	)
}

UserStatsResume.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,

	score: PropTypes.number.isRequired,
	winNumber: PropTypes.number.isRequired,
	globalRank: PropTypes.number.isRequired,
	localRank: PropTypes.number.isRequired,
	profilePicture: PropTypes.element
}

export default withStyles(styles, { withTheme: true })(UserStatsResume)
