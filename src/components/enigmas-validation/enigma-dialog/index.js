import React from 'react'

import { makeStyles, Typography } from '@material-ui/core/index'
import {
	DialogTitle,
	DialogActions,
	DialogContent,
	Dialog,
	TextField
} from '@material-ui/core/index'
import { Tab, Tabs, Button } from '@material-ui/core/index'
import {
	AllInclusive,
	Rowing,
	SupervisedUserCircle,
	Whatshot,
	PlayCircleOutline
} from '@material-ui/icons/index'
import Paper from '@material-ui/core/Paper/index'

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
	const { onOpen, enigma, ...other } = props
	const [score, setScore] = React.useState(enigma.scoreReward)
	function handleClose() {
		onOpen(false)
	}

	function handleChange(event, newValue) {
		if (newValue > 100) {
			newValue = 100
		}
		if (newValue < 1) {
			newValue = 1
		}
		setScore(newValue)
	}

	function handleLaunchGame() {
		props.history.push({
			pathname: '/enigma',
			state: { type: enigma.type, enigma: enigma }
		})
	}
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth={true}
			maxWidth={'sm'}
			{...other}>
			<DialogTitle style={{ alignSelf: 'center' }} id="dialog-title">
				{enigma.name}
			</DialogTitle>
			<DialogContent>
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
				/>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleLaunchGame} color="primary">
					Valider
					<PlayCircleOutline className={classes.rightIcon} />
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EnigmaDialog
