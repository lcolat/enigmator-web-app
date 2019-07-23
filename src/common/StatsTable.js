import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Table from '@material-ui/core/Table/index'
import TableBody from '@material-ui/core/TableBody/index'
import TableCell from '@material-ui/core/TableCell/index'
import TableHead from '@material-ui/core/TableHead/index'
import TableRow from '@material-ui/core/TableRow/index'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
	table: {
		minWidth: 400
	}
})

function StatsTable(props) {
	const { classes, currentUserStats, friendStats, isCompared } = props
	return (
		<>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="center" style={{ fontWeight: 'bold' }}>
							Score
						</TableCell>
						<TableCell align="center" style={{ fontWeight: 'bold' }}>
							Classement Mondial
						</TableCell>
						<TableCell align="center" style={{ fontWeight: 'bold' }}>
							Classement Local
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow key={friendStats.id}>
						<TableCell align="center">
							<Typography>{friendStats.score}</Typography>
							{isCompared && (
								<Typography color={'secondary'}>
									{currentUserStats.score}
								</Typography>
							)}
						</TableCell>
						<TableCell align="center">
							<Typography>{friendStats.globalRank}</Typography>
							{isCompared && (
								<Typography color={'secondary'}>
									{currentUserStats.globalRank}
								</Typography>
							)}
						</TableCell>
						<TableCell align="center">
							<Typography>{friendStats.localRank}</Typography>
							{isCompared && (
								<Typography color={'secondary'}>
									{currentUserStats.localRank}
								</Typography>
							)}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}

StatsTable.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StatsTable)
