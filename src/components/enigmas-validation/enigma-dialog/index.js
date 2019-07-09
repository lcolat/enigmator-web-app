import React, { useState, useEffect } from 'react'

import { makeStyles, Typography } from '@material-ui/core/index'
import {
	DialogTitle,
	DialogActions,
	DialogContent,
	Dialog,
	TextField
} from '@material-ui/core/index'
import { Button } from '@material-ui/core/index'
import { Check, Close } from '@material-ui/icons/index'
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

	function handleChange(event, newValue) {
		if (newValue > 100) {
			newValue = 100
		}
		if (newValue < 1) {
			newValue = 1
		}
		setScore(newValue)
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
				message: res
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
