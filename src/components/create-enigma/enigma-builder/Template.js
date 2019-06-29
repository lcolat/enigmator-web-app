import React, { Component } from 'react'

import { withStyles, Grid } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'

import { Save } from '@material-ui/icons'

import EnigmaService from 'services/enigmaService'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'

const style = theme => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	textFieldDescription: {
		width: '80%',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(1),
		color: theme.palette.primary.main
	},
	rightIcon: {
		marginLeft: theme.spacing(1)
	}
})
class Template extends Component {
	state = {
		name: '',
		scoreReward: 1,
		question: '',
		answer: '',
		file: undefined,
		mediaType: undefined,
		creationDate: '',
		UserID: this.props.userService.id
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}
	setFile = file => {
		this.setState({ file: file })
	}
	setMediaType = mediaType => {
		this.setState({ mediaType: mediaType })
	}
	saveEnigma = async () => {
		const enigmaService = new EnigmaService()
		const res = await enigmaService.create(
			this.state.name,
			this.state.question,
			this.state.answer,
			this.state.scoreReward,
			this.state.file,
			this.state.mediaType
		)
		if (res) {
			createNotification({
				level: Level.SUCCESS,
				message:
					"Votre enigme a bien été crée.\nElle sera disponnible suite à la validation d'un validateur"
			})
			this.props.setEnigmaType(undefined)
		} else {
			createNotification({
				level: Level.ERROR,
				message: res
			})
		}
	}

	render() {
		const { classes, component: Component } = this.props
		return (
			<Grid
				container
				direction={'column'}
				justify={'center'}
				alignItems={'center'}>
				<TextField
					id="enigma-name"
					label="Nom"
					name="name"
					className={classes.textField}
					value={this.state.name}
					onChange={this.handleChange}
					margin="normal"
				/>
				<TextField
					id="enigma-scoreReward"
					label="Score"
					name="scoreReward"
					className={classes.textField}
					value={this.state.scoreReward}
					onChange={this.handleChange}
					type={'number'}
					InputLabelProps={{
						shrink: true
					}}
					margin="normal"
				/>
				<TextField
					id="enigma-question"
					label="Question"
					name="question"
					multiline
					rowsMax="8"
					value={this.state.question}
					onChange={this.handleChange}
					className={classes.textFieldDescription}
					fullWidth
					margin="normal"
				/>
				<TextField
					id="enigma-response"
					label="Réponse"
					name="answer"
					multiline
					rowsMax="8"
					value={this.state.answer}
					onChange={this.handleChange}
					className={classes.textFieldDescription}
					fullWidth
					margin="normal"
				/>
				{Component !== undefined && (
					<Component.type
						{...Component.props}
						setFile={this.setFile}
						setMediaType={this.setMediaType}
						mediaType={this.props.mediaType}
					/>
				)}
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
					onClick={this.saveEnigma}>
					Enregistrer l'Énigme
					<Save className={classes.rightIcon} />
				</Button>
			</Grid>
		)
	}
}

export default withStyles(style)(Template)
