import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import LocalActivity from '@material-ui/icons/LocalActivity'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import { Difficulties, kind } from 'model/Enigma'
import { FormatDate } from 'common/'

const styles = theme => ({
	root: {
		width: '100%',
		// maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: 'inline'
	},
	htmlTooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		//maxWidth: root.width,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
		'& b': {
			fontWeight: theme.typography.fontWeightMedium
		}
	}
})

class EnigmasList extends React.Component {
	handleArrowRef = node => {
		this.setState({
			arrowRef: node
		})
	}

	state = {
		arrowRef: null
	}

	// const { classes } = props;
	render() {
		const { classes, enigmas } = this.props
		const { rows } = this.state

		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableCell align="left" style={{ height: 26 }}>
								Dernières Énigmes
							</TableCell>
							<TableCell align="left" style={{ height: 26 }}>
								Créateur
							</TableCell>
							<TableCell align="left" style={{ height: 26 }}>
								Type
							</TableCell>
							<TableCell align="left" style={{ height: 26 }}>
								Difficultée
							</TableCell>
							<TableCell align="left" style={{ height: 26 }}>
								Date de création
							</TableCell>
							<TableCell align="left" style={{ height: 26 }}>
								<LocalActivity />
							</TableCell>
						</TableHead>
						<TableBody>
							{enigmas.map(row => (
								<Tooltip
									TransitionComponent={Fade}
									TransitionProps={{ timeout: 600 }}
									classes={{
										tooltip: classes.htmlTooltip
									}}
									PopperProps={{
										popperOptions: {
											modifiers: {
												arrow: {
													enabled: Boolean(this.state.arrowRef),
													element: this.state.arrowRef
												}
											}
										}
									}}
									title={
										<React.Fragment>
											<Typography color="inherit">{row.question}</Typography>
											<span
												className={classes.arrow}
												ref={this.handleArrowRef}
											/>
										</React.Fragment>
									}>
									<TableRow
										key={row.id}
										style={{ height: 36, cursor: 'pointer' }}
										onClick={() => {
											this.props.history.push({
												pathname: '/enigma',
												state: {
													type: row.type,
													enigma: row
												}
											})
										}}
										hover>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="left" scope="row">
											{row.Enigme_User.username}
										</TableCell>
										<TableCell align="left">{kind(row.type)}</TableCell>
										<TableCell align="left">
											{Difficulties(row.scoreReward)}
										</TableCell>
										<TableCell align="left">
											{FormatDate(row.creationDate)}
										</TableCell>
										<TableCell align="left">{row.scoreReward}</TableCell>
									</TableRow>
								</Tooltip>
							))}
						</TableBody>
					</Table>
				</div>
			</Paper>
		)
	}
}

EnigmasList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EnigmasList)
