import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles/index'
import Table from '@material-ui/core/Table/index'
import TableBody from '@material-ui/core/TableBody/index'
import TableCell from '@material-ui/core/TableCell/index'
import TableHead from '@material-ui/core/TableHead/index'
import TableRow from '@material-ui/core/TableRow/index'
import { Typography } from '@material-ui/core'
import { playMode } from '../model/Enigma'

const styles = theme => ({
	table: {
		minWidth: 400
	}
})

let id = 0

function createData(type, rank, score, win) {
	id += 1
	return { id, type, rank, score, win }
}

const rows = [
	createData(playMode[0], 102, 840, 37),
	createData(playMode[0], 110, 729, 31),
	createData(playMode[0], 382, 450, 24)
]

function getMTotalScore() {
	let scoreTotal = 0
	rows.map(row => (scoreTotal += row.score))
	return scoreTotal
}

function getTotalWin() {
	let winTotal = 0
	rows.map(row => (winTotal += row.win))
	return winTotal
}

rows.push(createData('Global', 178, getMTotalScore(), getTotalWin()))

function StatsTable(props) {
	const { classes, currentUserStats, isCompared } = props

	return (
		<>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="right"> </TableCell>
						<TableCell align="center" style={{ fontWeight: 'bold' }}>
							Rank
						</TableCell>
						<TableCell align="center" style={{ fontWeight: 'bold' }}>
							Score
						</TableCell>
						<TableCell align="center" style={{ fontWeight: 'bold' }}>
							Win
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={row.id}>
							<TableCell
								component="th"
								scope="row"
								style={{ fontWeight: 'bold' }}>
								{row.type}
							</TableCell>
							<TableCell align="center">
								<Typography>{row.rank}</Typography>
								{isCompared && (
									<Typography color={'secondary'}>
										{currentUserStats[index].rank}
									</Typography>
								)}
							</TableCell>
							<TableCell align="center">
								<Typography>{row.score}</Typography>
								{isCompared && (
									<Typography color={'secondary'}>
										{currentUserStats[index].score}
									</Typography>
								)}
							</TableCell>
							<TableCell align="center">
								<Typography>{row.win}</Typography>
								{isCompared && (
									<Typography color={'secondary'}>
										{currentUserStats[index].win}
									</Typography>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}

StatsTable.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StatsTable)
