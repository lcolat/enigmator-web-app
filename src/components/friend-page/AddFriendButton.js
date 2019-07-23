import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withStyles from '@material-ui/core/styles/withStyles'
import PersonAdd from '@material-ui/icons/PersonAdd'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'

const styles = theme => ({
	button: {
		margin: theme.spacing()
	},
	buttonRightIcon: {
		marginLeft: theme.spacing()
	}
})

function AddFriendButton(props, classes) {
	const [open, setOpen] = React.useState(false)
	const [username, setUsername] = React.useState('')
	function handleClickOpen() {
		setOpen(true)
	}

	function handleClose() {
		setOpen(false)
	}

	async function handleAddFriend() {
		const user = await props.userService.get(undefined, { username: username })
		if (user.length === undefined || user.length === 0) {
			createNotification({
				level: Level.INFO,
				message: 'Aucun utilisateur trouvé avec ce pseudo'
			})
		} else {
			const res = await props.userService.addFriend(user[0].id)
			if (res === true) {
				createNotification({
					level: Level.SUCCESS,
					message: "Demande d'amis envoyé"
				})
			} else {
				createNotification({
					level: Level.ERROR,
					message: res.message || res.data.message
				})
			}
		}
		handleClose()
	}

	function handleChange(event) {
		const value = event.target.value
		setUsername(value)
	}
	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				onClick={handleClickOpen}>
				<PersonAdd className={classes.buttonRightIcon} />
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth={'sm'}>
				<DialogTitle id="form-dialog-title">Ajouter un ami</DialogTitle>
				<DialogContent>
					<DialogContentText>Saisissez le nom de l'ami</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="username"
						label="Pseudo"
						type="email"
						value={username}
						onChange={handleChange}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Annuler
					</Button>
					<Button onClick={handleAddFriend} color="primary">
						<PersonAdd className={classes.buttonRightIcon} />
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default withStyles(styles)(AddFriendButton)
