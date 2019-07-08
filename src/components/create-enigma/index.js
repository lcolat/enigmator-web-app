import React, { Component } from 'react'
import { Grid, withStyles, Button } from '@material-ui/core'
import { enigmasTypes } from 'model/Enigma'
import EnigmaBuilder from './enigma-builder'
const style = theme => ({
	button: {
		margin: theme.spacing(1),
		color: theme.palette.primary.main,
		width: '250px'
	},
	titleDiv: {
		width: '100%'
	},
	enigmaType: {
		marginTop: `calc(50vh - ${theme.spacing(7)}px)`,
		transform: 'translateY(-50%)'
	}
})
class EnigmaTypeSelection extends Component {
	state = {
		type: undefined
	}

	handleClick = type => {
		this.setState({ type: type })
	}
	setEnigmaType = enigmaType => {
		this.setState({ type: enigmaType })
	}

	render() {
		const { classes } = this.props
		return this.state.type !== undefined ? (
			<EnigmaBuilder
				{...this.props}
				type={this.state.type}
				setEnigmaType={this.setEnigmaType}
			/>
		) : (
			<Grid
				container
				alignItems={'center'}
				justify={'space-between'}
				direction={'column'}
				style={{ justifyContent: 'center' }}
				className={classes.enigmaType}>
				<Button
					className={classes.button}
					variant="contained"
					color="secondary"
					onClick={() => {
						this.setState({ type: enigmasTypes.IMAGE })
					}}>
					Nouvelle énigme Visuelle
				</Button>
				<Button
					className={classes.button}
					variant="contained"
					color="secondary"
					onClick={() => {
						this.setState({ type: enigmasTypes.TEXT })
					}}>
					Nouvelle énigme Textuelle
				</Button>
				<Button
					className={classes.button}
					variant="contained"
					color="secondary"
					onClick={() => {
						this.setState({ type: enigmasTypes.AUDIO })
					}}>
					Nouvelle énigme Audio
				</Button>
				<Button
					className={classes.button}
					variant="contained"
					color="secondary"
					onClick={() => {
						this.setState({ type: enigmasTypes.VIDEO })
					}}>
					Nouvelle énigme Vidéo
				</Button>
			</Grid>
		)
	}
}
export default withStyles(style)(EnigmaTypeSelection)
