import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import EnigmaContent from './enigma-content'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'

const useStyles = makeStyles(theme => ({
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	message: {
		margin: theme.spacing(2)
	}
}))

function EnigmaDialog(props) {
	const classes = useStyles()
	const {
		onOpen,
		onClose,
		setOpen,
		enigma,
		enigmaService,
		removeEnigma,
		...other
	} = props
	const [score, setScore] = React.useState(enigma.scoreReward)

	const [content, setContent] = useState(undefined)

	const fetchMedia = async () => {
		const res = await enigmaService.getEnigmaFileUrl(enigma.id)
		setContent(res)
	}

	useEffect(() => {
		enigma.type !== 'text' && fetchMedia(content)
	}, [content])

	function handleChange(event) {
		let value = parseInt(event.target.value)
		if (value > 100) {
			value = 100
		}
		if (value < 1) {
			value = 1
		}
		setScore(value)
	}

	const handleValidate = async () => {
		const res = await enigmaService.validateEnigma(enigma.id, score)
		if (res === true) {
			removeEnigma()
			createNotification({
				level: Level.SUCCESS,
				message: "L'énigme à bien été validée"
			})
		} else {
			createNotification({
				level: Level.ERROR,
				message: res.message || res.data.message
			})
		}
		setOpen(false)
	}
	function handleClose() {
		setOpen(false)
	}
	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth={true}
			maxWidth={'md'}
			{...other}>
			<DialogTitle style={{ alignSelf: 'center' }} id="dialog-title">
				{enigma.name}
			</DialogTitle>
			<DialogContent style={{ alignSelf: 'center' }}>
				{content !== undefined && (
					<EnigmaContent type={enigma.type} content={content} />
				)}
				<Typography>Question: {enigma.question}</Typography>
				<Typography>Réponse: {enigma.answer}</Typography>
				<TextField
					id="score"
					label="Score"
					className={classes.textField}
					value={score}
					type={'number'}
					onChange={handleChange}
					margin="normal"
					InputLabelProps={{
						shrink: true
					}}
				/>
			</DialogContent>
			<DialogActions style={{ alignSelf: 'center' }}>
				<Button variant="contained" onClick={handleClose} color="primary">
					Annuler
					<Close className={classes.rightIcon} />
				</Button>
				<Button variant="contained" onClick={handleValidate} color="primary">
					Valider
					<Check className={classes.rightIcon} />
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EnigmaDialog
