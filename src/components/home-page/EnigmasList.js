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

let counter = 0

function createData(
	nameEnigma,
	creatorName,
	kind,
	difficulty,
	dateOfCreation,
	pointValue,
	description
) {
	counter += 1
	return {
		id: counter,
		name: nameEnigma,
		author: creatorName,
		type: kind,
		level: difficulty,
		date: dateOfCreation,
		score: pointValue,
		info: description
	}
}

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
		arrowRef: null,

		rows: [
			createData(
				'SuperEnigma',
				'DamSaulGoodMan',
				'audio',
				'easy',
				'23:36, 10/05/19',
				25,
				'A free one :)'
			),
			createData(
				'Who have 4-2-3 paws?',
				'The Sphinx',
				'text',
				'hard',
				'02:59, 02/05/19',
				75,
				'Œdipe solve it'
			),
			createData(
				'What did the third Dwarf take?',
				'Dora',
				'text',
				'medium',
				'23:10, 10/05/19',
				50,
				'Brain f*ck*ng enigma'
			),
			createData(
				'v<^<^>v<^^<><<>>v>',
				'Saïtama',
				'picture',
				'demon',
				'09:00, 11/11/17',
				100,
				'All the enigma is in the title ;), i hope you will follow the right way !'
			)
		].sort((a, b) => (a.date < b.date ? -1 : 1))
	}

	// const { classes } = props;
	render() {
		const { classes } = this.props
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
							{rows.map(row => (
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
											<Typography color="inherit">{row.info}</Typography>
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
											alert('Soon able to go to the enigma :)')
										}}
										hover>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="left" scope="row">
											{row.author}
										</TableCell>
										<TableCell align="left">{row.type}</TableCell>
										<TableCell align="left">{row.level}</TableCell>
										<TableCell align="left">{row.date}</TableCell>
										<TableCell align="left">{row.score}</TableCell>
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
